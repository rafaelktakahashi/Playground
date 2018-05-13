defmodule FibTest do
  use ExUnit.Case
  doctest Fib

  test "test naive fib" do
    assert Fib.naivefib(11) == 89
    assert Fib.naivefib(17) == 1597
    assert Fib.naivefib(23) == 28657
  end

  test "test fib" do
    assert Fib.fib(11) == 89
    assert Fib.fib(17) == 1597
    assert Fib.fib(23) == 28657
    assert Fib.fib(42) == 267914296
    assert Fib.fib(141) == 131151201344081895336534324866
    assert Fib.fib(500) == 139423224561697880139724382870407283950070256587697307264108962948325571622863290691557658876222521294125
  end
end
