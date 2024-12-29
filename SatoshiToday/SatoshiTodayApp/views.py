from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from .models import BitcoinPrice
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Exemplo de dicionário de moedas por país
COUNTRY_TO_CURRENCY = {
    'US': 'USD',
    'BR': 'BRL',
    'EU': 'EUR',
    # Adicione outros países e suas moedas conforme necessário
}


def get_local_price(request):
    country = request.GET.get('country', 'BR')  # Valor padrão é 'US' se o país não for fornecido
    moeda_fiat = COUNTRY_TO_CURRENCY.get(country, 'BRL')  # Define a moeda com base no país
    print(moeda_fiat)
    # Busca a cotação mais recente para a moeda no banco de dados
    latest_price = BitcoinPrice.objects.filter(moeda_fiat=moeda_fiat).order_by('date_price').last()
    print(latest_price)
    if latest_price:
        local_price = latest_price.btc_price
        return local_price, moeda_fiat
      #   return JsonResponse({'local_price': local_price, 'moeda_fiat': moeda_fiat})
    else:
        return JsonResponse({'error': 'Cotação não encontrada'}, status=404)
    

def update_price(request):
    # Função para buscar ou simular a atualização da cotação
    bitcoin_price = get_local_price()  # Supondo uma função que busca a cotação atual
    
    # Armazena o novo preço no banco de dados, se necessário
    BitcoinPrice.objects.create(btc_price=bitcoin_price, moeda_fiat='USD')
    
    # Retorna a cotação como resposta em JSON
    return JsonResponse({'bitcoin_price': bitcoin_price})


@csrf_exempt  # Apenas para desenvolvimento. Para produção, use CSRF corretamente.
def simulate(request):
    if request.method == 'POST':
        try:
            # Recebe os dados enviados pelo frontend
            body = json.loads(request.body)
            fiat = float(body.get('fiat', 0))
            sats = float(body.get('sats', 0))
            btc_value = float(body.get('btcValue', 0))

            # Lógica de cálculo
            if btc_value > 0:
                fiat_calculated = (sats / 100_000_000) * btc_value if sats > 0 else fiat
                sats_calculated = (fiat / btc_value) * 100_000_000 if fiat > 0 else sats

                return JsonResponse({
                    'fiat': fiat_calculated,
                    'satoshis': sats_calculated,
                    'btc_value': btc_value
                })
            else:
                return JsonResponse({'error': 'O valor do Bitcoin deve ser maior que zero'}, status=400)

        except Exception as e:
            print("Erro ao processar os dados:", e)  # Log do erro

            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método não permitido'}, status=405)
# Create your views here.
def HomePage(request):

        #Pegando o valor do bitcoin no banco de dados
        btc_price, moeda_fiat = get_local_price(request)
        print(btc_price)
        satoshi_amount = btc_price * 100000000
        initial_fiat = 1.00
        initial_satoshi = (initial_fiat / float(btc_price)) * 100000000 if btc_price > 0 else 0

        context = {
              'btc_price': btc_price,
              'satoshi_amount': satoshi_amount,
              'moeda_fiat': moeda_fiat,
              'initial_fiat': initial_fiat,
              'initial_satoshi': initial_satoshi
                              
        }
        # print(context)
        return render(request, "SatoshiTodayApp/base.html", context)
    