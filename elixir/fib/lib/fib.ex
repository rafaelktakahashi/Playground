defmodule Fib do
  @moduledoc """
  Trivial Fibonacci, just because
  I wanted to see how Elixir Mixes
  work.
  """

  def naivefib(0), do: 1
  def naivefib(1), do: 1
  def naivefib(n) do
    naivefib(n-1) + naivefib(n-2)
  end
end
