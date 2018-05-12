defmodule FibTest do
  use ExUnit.Case
  doctest Fib

  test "test naive fib" do
    assert Fib.naivefib(10) == 55
    assert Fib.naivefib(16) == 987
  end
end
