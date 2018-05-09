defmodule Modpow do
    def calculate(b,e,m) do
        tail_calculate(b,e,m,1)
    end
    
    def tail_calculate(_,0,_,_) do
        1
    end
    
    def tail_calculate(b, e, m, acc) do
        tail_calculate(b, e-1, m, rem(acc*b,m))
    end
end

IO.puts Modpow.calculate(12, 2, 1000)
IO.puts Modpow.calculate(127, 10, 13)
IO.puts Modpow.calculate(9688563, 45896, 71)
