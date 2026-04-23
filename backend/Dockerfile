FROM ubuntu:24.04 AS builder

RUN apt-get update && apt-get install -y \
    g++ make git libssl-dev libreadline-dev libsqlite3-dev \
    && rm -rf /var/lib/apt/lists/*

RUN git clone --recursive https://github.com/praia-lang/praia.git /tmp/praia \
    && cd /tmp/praia && make && make install PREFIX=/usr

WORKDIR /grains
COPY sand-lock.yaml ./
RUN sand install

FROM ubuntu:24.04

RUN apt-get update && apt-get install -y \
    libssl3t64 libreadline8t64 libsqlite3-0 \
    && rm -rf /var/lib/apt/lists/*

COPY --from=builder /usr/bin/praia /usr/bin/praia
COPY --from=builder /usr/lib/praia/ /usr/lib/praia/

WORKDIR /app
COPY . .
COPY --from=builder /grains/ext_grains/ ./ext_grains/

EXPOSE 3000

CMD ["praia", "main.praia"]
