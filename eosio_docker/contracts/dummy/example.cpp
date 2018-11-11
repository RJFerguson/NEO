#include <eosiolib/eosio.hpp>

using namespace eosio;

CONTRACT example : public eosio::contract
{
public:
  using contract::contract;
  ACTION update(name user)
  {
    print("Hello, ", name{user});
  }
};

EOSIO_DISPATCH(example, (update))
