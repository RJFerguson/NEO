#include <eosiolib/eosio.hpp>

using namespace eosio;

CONTRACT neohash : public eosio::contract
{
  TABLE neostruct
  {
    uint64_t prim_key; // primary key
    name user;
    std::string neodata;
    uint64_t timestamp;

    // primary key
    auto primary_key() const { return prim_key; }

    uint64_t get_by_time() const { return timestamp; }
  };

// create a multi-index table and support secondary key
  typedef eosio::multi_index<name("neostruct"), neostruct, indexed_by<name("getbytime"), const_mem_fun<neostruct, uint64_t, &neostruct::get_by_time>>> 
    neo_table;


  neo_table  _neo;


public:
  using contract::contract;

  neochain(name receiver, name code, datastream<const char *> ds) : contract(receiver, code, ds),
                                                                    _neo(receiver, receiver.value) {}

  ACTION test(name user)
  {
    print("Hello, ", name{user});
  }

  ACTION update(name user, std::string & neodata)
  {
    // to sign the action with the given account
    require_auth(user);
    {
      // get object by secordary key
      auto neo_index = _neo.get_index<name("getbytime")>();
      auto &note_entry = neo_index.get(timestamp);
      // update existing note
      _notes.modify(note_entry, _self, [&](auto &modified_user) {
        modified_user.note = note;
        modified_user.timestamp = now();
      });
    }
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

  ACTION findHash(name user, std::string & neodata)
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
