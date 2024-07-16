import requests

# URL base para a requisição GET
base_url = 'https://fon05xm1td.atdxllaxlp.net/gs2c/promo/frb/available/?mgckey=AUTHTOKEN@14b2cf3ab09772f8a046e951f267fe45763967fabb3fc21b5954c93a354143b3~stylename@wingaming_wgbrl0008~SESSION@7b308d42-2e8d-40e8-8c6b-0e8f6dc5840b~SN@170cae92'

# Parâmetro mgckey
mgckey = 'AUTHTOKEN@5c10007458cbec8e73cd0840ee101cb0a1e8b549643fba6818a1e13ef4619280~stylename@wingaming_wgbrl0008~SESSION@ada5d34f-07e1-4be2-8b82-7c9d3bf4f8ee~SN@e4871eb9'

# Construindo a URL completa com o parâmetro
url = f'{base_url}'

# Enviando a requisição GET
response = requests.get(url)

# Verificando a resposta
if response.status_code == 200:
    print('GET request foi enviado com sucesso!')
    print('Resposta:', response.text)
else:
    print(f'Falha ao enviar GET request. Status code: {response.status_code}')
    print(f'Resposta: {response.text}')
