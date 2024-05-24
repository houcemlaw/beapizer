# Create Self-Signed Certificates for your development API server(s)

## Create your server private key `server.key`
`openssl genrsa -des3 -out server.key 2048`

## Create a Certificate Signing Request (CSR) server private key `server.csr`
`openssl req -new -key server.key -out server.csr`

## Generate a self-signed certificate `server.crt`
`openssl x509 -req -days 825 -in server.csr -signkey server.key -out server.crt  -sha256`


# Generate CA-Signed Certificates for your development API server(s)

## Generate a CA Root Certificate `myserver_ca.pem`

#### Generate the ca private key `myserver_ca.key`
`openssl genrsa -des3 -out myserver_ca.key 2048`


#### Generate a root certificate `myserver_ca.pem`
`openssl req -x509 -new -nodes -key myserver_ca.key -sha256 -days 1825 -out myserver_ca.pem`

#### Adding the Root Certificate to Linux

```bash
sudo apt-get install -y ca-certificates
sudo cp myca.pem /usr/local/share/ca-certificates/myserver_ca.crt
sudo update-ca-certificates
```
##### Test the certificate has been installed
```bash
awk -v cmd='openssl x509 -noout -subject' '/BEGIN/{close(cmd)};{print | cmd}' < /etc/ssl/certs/ca-certificates.crt | grep Hellfish
```

## Create your server private key `server.domain.key`
`openssl genrsa -out server.domain.key 2048`

## Create a Certificate Signing Request (CSR) `server.domain.csr`
`openssl req -new -key server.domain.key -out server.domain.csr`

## Create a config file `server.domain.cert_config` for defining `SAN`
create an `X509 V3 certificate extension config file`, which is used to define the `Subject Alternative Name (SAN)` for the certificate. In our case, we’ll create a configuration file called `server.domain.cert_config` containing the following text:

```properties
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = server.domain
```

## Create a CA-signed certificate `server.domain.crt`
`openssl x509 -req -in server.domain.csr -CA myserver_ca.pem -CAkey myserver_ca.key -CAcreateserial -out server.domain.crt -days 825 -sha256 -extfile server.domain.cert_config`


