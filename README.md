# AI plays 2048

A naive q-learning aproach to solving 2048.

Q-learning equation :

$$ Q_t(s,a) = Q_{t-1}(s,a) + \alpha TD_t(a,s) $$

Where 

$$ TD_t(a,s) = R(s,a) + \gamma \max_{a'} (Q_t(s',a')) - Q_{t-1}(s,a) $$
