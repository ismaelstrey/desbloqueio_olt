# Comandos Essenciais OLT Huawei

## Sumário

- [Comandos de Verificação de Sistema](#comandos-de-verificação-de-sistema)
- [Gerenciamento de Placas](#gerenciamento-de-placas)
- [Configuração de VLANs](#configuração-de-vlans)
- [Gerenciamento de ONTs](#gerenciamento-de-onts)
- [Monitoramento de Performance](#monitoramento-de-performance)
- [Configuração Inicial](#configuração-inicial)

## Comandos de Verificação de Sistema

### Status do Sistema

```
display sysuptime                    # Verifica tempo de atividade da OLT
display temperature 0                # Verifica temperatura dos slots
display data sync state              # Verifica sincronia entre controladoras
```

### Verificação de Recursos

```
display mem 0/1                      # Mostra uso de memória do slot
display cpu 0/1                      # Mostra uso de CPU do slot
```

## Gerenciamento de Placas

### Visualização e Controle

```
display board 0                      # Mostra todas as placas instaladas
display board 0/1                    # Mostra informações da placa específica
board confirm 0/1                    # Ativa uma placa específica
reboot active                        # Alterna entre controladoras
```

### Descrição de Portas

```
display port desc all                # Mostra descrição de todas as portas
port desc 3 description "nome"        # Adiciona descrição a uma porta
```

## Configuração de VLANs

### Criação e Configuração Básica

```
vlan 123 standard                    # Cria VLAN padrão
vlan name 123 Gerenciamento          # Define nome da VLAN
port vlan 123 0/4 3                  # Associa porta à VLAN
```

### Configuração de Interface VLAN

```
interface vlanif 123                 # Acessa configuração da VLAN
ip address 100.11.105.2 24           # Define IP da interface
ip route-static 0.0.0.0 0 10.11.105.1 # Configura rota padrão
```

## Gerenciamento de ONTs

### Localização e Status

```
display ont info by-sn ABCDEF        # Localiza ONT pelo número de série
display ont info 0 1 0 all           # Mostra status de todas ONTs na porta
display ont register-info 0 1         # Mostra histórico de registro das ONTs
```

### Monitoramento de ONT

```
display ont optical-info 0 all       # Mostra níveis de potência óptica
display ont version 0 1 0 4          # Mostra versão de firmware da ONT
display mac-address port 0/1/0 ont 2  # Mostra endereços MAC da ONT
```

## Monitoramento de Performance

### Diagnóstico de Rede

```
display temperature 0                # Monitoramento de temperatura
display ont wan-info 0/1 0 4         # Informações WAN da ONT (modo roteado)
```

## Configuração Inicial

### Configurações Básicas de Sistema

```
sysman service telnet enable         # Habilita serviço Telnet
sysman service snmp enable           # Habilita serviço SNMP
sysman firewall telnet disable       # Desabilita firewall para Telnet
sysman firewall snmp disable         # Desabilita firewall para SNMP

autosave interval 1442               # Configura intervalo de salvamento
autosave type all                    # Salva todas as configurações
autosave interval configuration 480   # Intervalo para salvar configurações
autosave interval on                 # Ativa salvamento automático

time-stamp utc                       # Configura formato de timestamp
timezone GMT- 03:00                  # Configura fuso horário
```

### Configuração NTP

```
ntp-service unicast-server 20.101.57.9    # Configura servidor NTP primário
ntp-service unicast-server 216.239.35.4   # Configura servidor NTP secundário
```

### Configuração SNMP

```
snmp-agent community read SmartOlt@@2024!    # Define comunidade de leitura
snmp-agent community write SmartOlt@@2024!   # Define comunidade de escrita
snmp-agent sys-info contact LpInternet       # Define contato do sistema
snmp-agent sys-info location OLT-POP-PINHAL  # Define localização do sistema
snmp-agent trap enable standard              # Habilita traps padrão
```

### Configuração VLAN de Gerenciamento

```
vlan 4050 standard                          # Cria VLAN de gerenciamento
vlan name 4050 Gerenciamento                # Define nome da VLAN
port vlan 4050 0/8 0                        # Associa porta à VLAN

interface vlanif 4050                       # Configura interface VLAN
ip address 100.11.105.2 24                  # Define IP da interface
ip route-static 0.0.0.0 24.10.10.10.10     # Configura rota padrão
```

### Configuração de Link Aggregation

```
link-aggregation 0/8 0 0/9 0 egress-ingress workmode lacp-static  # Configura agregação de links
```

> **Nota**:
>
> 1. Mantenha as credenciais e chaves de acesso em local seguro.
> 2. Altere as senhas padrão por questões de segurança.
> 3. Documente todas as alterações realizadas.
> 4. Faça backup das configurações após mudanças significativas.
