for /F "tokens=*" %%A in (accounts.txt) do geth --unlock %%A
