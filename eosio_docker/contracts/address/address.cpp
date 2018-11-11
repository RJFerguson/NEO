#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>

using namespace eosio;

class [[eosio::contract]] addressbook : public eosio::contract {

public:
  using contract::contract;
  
  addressbook(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void upsert(name user, std::string full_name, std::string street, std::string city, uint32_t phone) {
    require_auth( user );
    addressbook_type addresses(_code, _code.value);
    auto iterator = addresses.find(user.value);
    if( iterator == addresses.end() )
    {
      addresses.emplace(user, [&]( auto& row ) {
       row.key = user;
       row.full_name = full_name;
       row.street = street;
       row.city = city;
       row.phone = phone;
      });
    }
    else {
      std::string changes;
      addresses.modify(iterator, user, [&]( auto& row ) {
        row.key = user;
        row.full_name = full_name;
        row.street = street;
        row.city = city;
        row.phone = phone;
      });
    }
  }

  [[eosio::action]]
  void erase(name user) {
    require_auth(user);

    addressbook_type addresses(_self, _code.value);

    auto iterator = addresses.find(user.value);
    eosio_assert(iterator != addresses.end(), "Record does not exist");
    addresses.erase(iterator);
  }

private:
  struct [[eosio::table]] person {
    name key;
    std::string full_name;
    std::string street;
    std::string city;
    uint32_t phone;
    uint64_t primary_key() const { return key.value; }

  };
  typedef eosio::multi_index<"people"_n, person> addressbook_type;

};

EOSIO_DISPATCH( addressbook, (upsert)(erase))