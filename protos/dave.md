## Simplified Protocol - Protobuf

```
message Message {
# changes
    Op op = 1;
    repeated Transport transport = 2;
    bytes value = 3;
    bytes time = 4;
    bytes nonce = 5;
    bytes work = 6;
}
```

```
enum Op {
    GETPEER = 0;
    PEER = 1;
    SET = 2;
    GET = 3;
    DAT = 4;
}
```

```
# changes
message Transport {
    bytes type = 1;
    bytes data = 2;
}
```

## GETPEER

Input: null
Output: []
