# Guia de Verificação de OLT Huawei

## Verificação da Versão Atual

Para verificar a versão atual do sistema operacional da OLT, siga os passos abaixo:

1. Acesse a OLT via CLI (Command Line Interface)
2. Execute o comando:

```
display version
```

Este comando mostrará informações como:

- Versão do sistema operacional
- Build number
- Data de compilação
- Informações de copyright

Exemplo de saída:

```
MA5800V100R019C10
Patch Version: MA5800V100R019SPH013
Build Time: Aug 15 2022 09:30:00
```

## Verificação das Placas

Para visualizar as placas instaladas na OLT, utilize os seguintes comandos:

### Visão Geral das Placas

```
display board
```

Este comando mostra:

- Slot ocupados
- Tipo de placa em cada slot
- Estado operacional (Normal/Fault)
- Temperatura
- Status de energia

### Informações Detalhadas de uma Placa Específica

```
display board 0/1    # Substitua 0/1 pelo frame/slot desejado
```

### Status das Portas PON

```
display port state 0/1    # Substitua 0/1 pelo frame/slot da placa GPON
```

## Verificação de Firmwares

Para gerenciar e verificar os firmwares disponíveis na OLT:

### Listar Todos os Firmwares

```
dir /flash/
```

Este comando mostra:

- Arquivos de firmware (.bin)
- Tamanho dos arquivos
- Data de upload

### Verificar Versão Ativa

```
display startup
```

Mostra:

- Firmware atual em execução
- Próximo firmware para boot
- Configuração de inicialização

### Verificar Compatibilidade de ONUs

```
display ont-version 0/1    # Substitua 0/1 pelo frame/slot
```

Exibe:

- Versões de firmware suportadas para ONUs
- Modelos compatíveis
- Versões atuais das ONUs conectadas

## Dicas Importantes

1. **Backup de Configuração**: Sempre faça backup antes de qualquer alteração:

```
display saved-configuration
```

2. **Verificação de Memória**: Verifique o espaço disponível antes de upload de firmwares:

```
dir /flash
```

3. **Logs do Sistema**: Para troubleshooting, verifique os logs:

```
display alarm active
display log
```

## Observações de Segurança

- Mantenha registro de todas as alterações realizadas
- Use sempre usuários com privilégios adequados
- Evite fazer alterações em horários de pico
- Documente todas as versões e atualizações realizadas
