clc
for t = 0:15:1440
    m1 = mod(t,60);
    h1 = floor(t/60);
    m2 = mod(t+15,60);
    h2 = floor((t+15)/60);
    fprintf('%02d:%02d~%02d:%02d\n', h1, m1, h2, m2);
end
