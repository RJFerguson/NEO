#include <eosiolib/eosio.hpp>

using namespace eosio;

CONTRACT neohash : public eosio::contract

                       TABLE neostruct
{
  uint64_t prim_key; // primary key
  name user;
  std::string neodata;
  uint64_t timestamp;

  // primary key
  auto primary_key() const { return prim_key; }
};

// create a multi-index table and support secondary key
typedef eosio::multi_index<name("neotruct"), neostruct> neo_table;

neo_table _neo;

{
public:
  using contract::contract;

  neochain(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds),
                                                                    _neo(receiver, receiver.value) {}

  ACTION test(name user)
  {
    print("Hello, ", name{user});
  }

  ACTION submithash(name user, std::string & neodata)
  {
    _neo.emplace(_self, [&](auto &user) {
      user.prim_key = _neo.available_primary_key();
      user.user = user;
      user.neodata = neodata;
      user.timestamp = now();
    });
  }
};

EOSIO_DISPATCH(neochain, (test)(submithash))
