from django.db import models


class BitcoinPrice(models.Model):
    btc_price = models.DecimalField(max_digits=18, decimal_places=8)  # Valor do Bitcoin em moeda fiat
    date_price = models.DateTimeField(auto_now_add=True)  # Data e hora da inserção do valor
    moeda_fiat = models.CharField(max_length=10)  # Moeda de referência, ex: 'USD', 'BRL'
    
    # Campo opcional para adicionar alguma descrição ou identificador único do registro
    description = models.CharField(max_length=50, blank=True, null=True)
    
    class Meta:
        ordering = ['-date_price']  # Ordena pelos registros mais recentes por padrão
        unique_together = ['date_price', 'moeda_fiat']  # Evita registros duplicados para a mesma data e moeda

    def __str__(self):
        return f"{self.moeda_fiat} - {self.btc_price} at {self.date_price.strftime('%Y-%m-%d %H:%M:%S')}"     

# Create your models here.
class Cotacao(models.Model):
    moeda_fiat = models.CharField(max_length=10)  # Ex: 'BRL', 'USD'
    moeda_cripto = models.CharField(max_length=10)  # Ex: 'BTC', 'ETH'
    cotacao = models.DecimalField(max_digits=18, decimal_places=8)  # Valor da cotação
    data_registro = models.DateTimeField(auto_now_add=True)  # Data e hora do registro
    validade = models.DateTimeField()  # Data de validade da cotação

    class Meta:
        unique_together = ('moeda_fiat', 'moeda_cripto', 'validade')  # Evitar duplicações
        verbose_name = 'Cotação'
        verbose_name_plural = 'Cotações'

    def __str__(self):
        return f"{self.moeda_cripto} para {self.moeda_fiat}: {self.cotacao}"