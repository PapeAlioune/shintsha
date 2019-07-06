for /F "tokens=*" %%A in (accounts.txt) do geth account import --password ./password.txt %%A
