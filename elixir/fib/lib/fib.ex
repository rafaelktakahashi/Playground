defmodule Fib do
  @moduledoc """
  Trivial Fibonacci, just because
  I wanted to see how Elixir Mixes
  work. There's both a naive and a
  better, tail-recursive function.
  """

  def naivefib(0), do: 0
  def naivefib(1), do: 1
  def naivefib(n) do
    naivefib(n-1) + naivefib(n-2)
  end

  def fib(0), do: 0
  def fib(1), do: 1
  def fib(n), do: tailfib(n-1, 0, 1)
  def tailfib(0, acc1, acc2), do: acc2
  def tailfib(n, acc1, acc2) do
    tailfib(n - 1, acc2, acc1 + acc2)
  end
end
