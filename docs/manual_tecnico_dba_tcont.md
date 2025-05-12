# Manual Técnico: Configuração de DBA e T-CONT em OLTs Huawei

## 📚 Índice

1. [Introdução à GPON](#introdução-à-gpon)
2. [Entendendo T-CONTs](#entendendo-t-conts)
3. [DBA Profiles](#dba-profiles)
4. [CIR e PIR](#cir-e-pir)
5. [Oversubscription](#oversubscription)
6. [Configurações Práticas](#configurações-práticas)
7. [Troubleshooting](#troubleshooting)
8. [Integração com SmartOLT](#integração-com-smartolt)

## 🌟 Introdução à GPON

### Capacidades da GPON

- **Downstream**: 2,488 Gbps
- **Upstream**: 1,244 Gbps
- **Divisão**: Até 1:128 (recomendado 1:64 ou menos)

### Características Principais

- Transmissão TDM (Time Division Multiplexing)
- Alocação Dinâmica de Banda (DBA)
- Múltiplos tipos de serviço (Internet, VoIP, IPTV)

## 🔄 Entendendo T-CONTs

### Tipos de T-CONT

| Tipo | Nome            | Uso                  | Características         |
| ---- | --------------- | -------------------- | ----------------------- |
| 1    | Fixed           | Voz/IPTV             | Banda fixa garantida    |
| 2    | Assured         | Internet Corporativa | Banda mínima garantida  |
| 3    | Assured + Extra | Internet Premium     | Garantia + Burst        |
| 4    | Best Effort     | Internet Residencial | Sem garantias           |
| 5    | Combinado       | Serviços Mistos      | Mix de tipos anteriores |

### Exemplo de Verificação

```bash
# Ver T-CONT de uma ONU
display ont info 0/2/7 74

# Ver detalhes do DBA Profile
display dba-profile profile-id 11
```

## 🎯 DBA Profiles

### Componentes do DBA Profile

- **Profile ID**: Identificador único
- **Type**: Tipo de T-CONT (1-5)
- **Fix**: Banda fixa (kbps)
- **Assure**: Banda garantida (kbps)
- **Max**: Banda máxima (kbps)

### Exemplo de Configuração

```bash
# Criar DBA Profile Tipo 3 (300Mbps garantido, máx 1Gbps)
dba-profile add profile-id 300 type 3 assure 300000 max 1000000
```

## 🔄 CIR e PIR

### Definições

- **CIR (Committed Information Rate)**: Banda garantida
- **PIR (Peak Information Rate)**: Banda máxima

### Recomendações de Configuração

| Plano               | CIR     | PIR     | T-CONT Type |
| ------------------- | ------- | ------- | ----------- |
| Residencial 400Mbps | 50Mbps  | 400Mbps | 4           |
| Corporativo 200Mbps | 200Mbps | 200Mbps | 2           |
| Premium 1Gbps       | 300Mbps | 1Gbps   | 3           |

## 📊 Oversubscription

### Cálculos de Oversubscription

```
Oversubscription = (Soma dos PIRs) / (Capacidade da PON)
Exemplo:
- 64 clientes x 1Gbps = 64Gbps
- PON = 2.5Gbps
Oversubscription = 64/2.5 = 25.6:1
```

### Recomendações por Tipo de Serviço

| Serviço     | Ratio Máximo | Observações |
| ----------- | ------------ | ----------- |
| Residencial | 1:32         | Best Effort |
| Corporativo | 1:8          | Com CIR     |
| Premium     | 1:4          | Alto CIR    |

## ⚙️ Configurações Práticas

### Criando DBA Profile Corporativo

```bash
# DBA Profile para 200Mbps garantidos
dba-profile add profile-id 200 type 3
profile-name dba-profile_200M
fix 0 assure 200000 max 200000
```

### Aplicando na ONU

```bash
# Aplicar DBA Profile em uma ONU
interface gpon 0/2
ont dba-profile 7 74 1 profile-id 200
```

## 🔍 Troubleshooting

### Comandos Úteis

```bash
# Ver estado da ONU
display ont state gpon 0/2

# Ver tráfego da porta ETH
display traffic gpon-ont-port eth 0/2/7 74

# Ver DBA Profile atual
display ont dba-profile-id 0/2/7 74
```

### Problemas Comuns

1. **Lentidão em Horário de Pico**

   - Verificar oversubscription
   - Analisar logs de tráfego
   - Ajustar CIR/PIR

2. **Instabilidade**
   - Verificar potência óptica
   - Checar configuração de T-CONT
   - Validar DBA Profile

## 🔗 Integração com SmartOLT

### Configuração via SmartOLT

```bash
# Exemplo de configuração gerada pelo SmartOLT
traffic table ip name "SMARTOLT-Corporativo_1GB-DOWN"
cir 1024000 pir 1024000
priority 0 inner-priority 0
priority-policy local-setting
```

### Boas Práticas

1. Padronizar nomenclatura
2. Documentar profiles criados
3. Manter backup das configurações
4. Monitorar uso de banda

## 📈 Monitoramento

### Métricas Importantes

- Utilização de banda por PON
- CIR/PIR por cliente
- Latência
- Perda de pacotes

### Ferramentas Recomendadas

1. U2000/NMS
2. SmartOLT
3. Zabbix/PRTG
4. Grafana

## 🔒 Segurança

### Recomendações

1. Limitar acesso às configurações
2. Manter firmware atualizado
3. Implementar VLAN por serviço
4. Monitorar tentativas de acesso

---

## 📝 Notas Finais

### Melhores Práticas

1. Sempre documente alterações
2. Faça backup antes de mudanças
3. Teste em ambiente controlado
4. Monitore após alterações

### Links Úteis

- [Documentação Huawei](https://support.huawei.com)
- [Fórum GPON](https://forum.huawei.com/enterprise/en/gpon)
- [SmartOLT Docs](https://smartolt.com)
