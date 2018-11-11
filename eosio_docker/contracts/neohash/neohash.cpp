#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>


using namespace eosio;

class [[eosio::contract]] neohash : public eosio::contract {

public:
  using contract::contract;
  
  neohash(name receiver, name code,  datastream<const char*> ds): contract(receiver, code, ds) {}

  [[eosio::action]]
  void upsert(name user, std::string more_info, uint64_t timestamp) {
    neohash_type neohashes(_code, _code.value);
    auto iterator = neohashes.find(user.value);
    if( iterator == neohashes.end() )
    {
      neohashes.emplace(user, [&]( auto& row ) {
       row.key = user;
       row.more_info = more_info;
       row.timestamp = now();
      });
    }
    else {
      std::string changes;
      neohashes.modify(iterator, user, [&]( auto& row ) {
        row.key = user;
        row.more_info = more_info;
        row.timestamp = now();
      });
    }
  }


private:
  struct [[eosio::table]] neo {
    name key;
    std::string more_info;
    uint64_t timestamp;
    uint64_t primary_key() const { return key.value; }

  };
  typedef eosio::multi_index<"neo"_n, neo> neohash_type;

};

EOSIO_DISPATCH( neohash, (upsert))
