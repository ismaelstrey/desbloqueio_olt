tenho um OLT Huawei-MA5603 na versão R018 , um placa PON H805GPFD, tenho uma duvida posso colocar 70 clientes em uma pon com cada um com um plano de 1gb de up e 1GB de Down, que vou conseguir manter essa taxa de transferencia?
O ChatGPT disse:
Ismael, essa é uma dúvida muito comum quando se trabalha com redes GPON, e é muito importante entender os limites da tecnologia para não prometer mais do que ela pode entregar. Vamos à análise com sinceridade técnica:

🔍 Tecnologia GPON – Limites Físicos
A sua placa H805GPFD é uma placa GPON. A tecnologia GPON tem os seguintes limites teóricos:

Taxa de downstream (rede → cliente): até 2,488 Gbps

Taxa de upstream (cliente → rede): até 1,244 Gbps

Esses valores são compartilhados por todos os clientes conectados na mesma PON.

📊 Cenário que você propôs:
70 clientes por PON

Plano contratado: 1 Gbps up / 1 Gbps down por cliente

⚠️ Problema:
Se cada um dos 70 clientes tentasse usar os 1 Gbps ao mesmo tempo, você precisaria de 70 Gbps de download e 70 Gbps de upload, o que não é possível com a GPON, já que ela entrega no máximo 2,5 Gbps down e 1,25 Gbps up por porta.

📉 O que realmente acontece na prática:
Na prática, os provedores usam o conceito de oversubscription (superprovisionamento).

Como nem todos os clientes usam 100% do plano ao mesmo tempo, é comum usar relações de até 1:32 ou 1:64 em GPON, com planos de até 300 Mbps. Em planos de 1 Gbps, é muito arriscado passar de 1:16 ou no máximo 1:32.

Você também precisa considerar o pico de uso simultâneo, que geralmente ocorre à noite.

✅ Soluções ou recomendações:
Não coloque 70 clientes de 1Gbps em uma mesma porta PON.

Isso saturaria completamente a capacidade.

Uma divisão de 16 ou 32 clientes por PON seria o máximo recomendável com planos de 1Gbps.

Considere XG-PON (10G-PON) ou XGS-PON:

Para entregar 1 Gbps dedicado ou quase dedicado, o ideal é migrar para uma tecnologia como XGS-PON, que oferece 10 Gbps simétricos por PON.

Se ainda quiser usar GPON com 70 clientes:

Você terá que limitar o uso real de banda com QoS, rate limit ou adotar planos com "até 1Gbps" e não dedicados.

Use monitoramento ativo para reagir a saturações antes que virem reclamações.

🧠 Resumo direto:
Item Valor Máximo GPON Seu cenário (70 x 1Gbps)
Downstream total 2.5 Gbps 70 Gbps
Upstream total 1.25 Gbps 70 Gbps
Resultado 🚫 Não viável Risco extremo de gargalo

Se quiser, posso te ajudar a modelar uma divisão ideal dos clientes entre as portas PON disponíveis, ou até simular o tráfego médio para ver até onde sua rede pode aguentar com segurança.

Você gostaria que eu te ajudasse a montar esse dimensionamento mais detalhado?

Você disse:
e a utilização do cir e cdir?

O ChatGPT disse:
Ótima pergunta, Ismael! O uso de CIR e PIR/CDIR é essencial quando queremos entregar planos altos (como 1 Gbps) em redes GPON sem saturar as portas.

Vamos explicar com clareza e com foco na prática de provedores:

🧩 O que são CIR e PIR/CDIR?
Termo Significado Explicação prática
CIR Committed Information Rate Banda garantida mínima que o cliente terá sempre disponível.
PIR/CDIR Peak Information Rate / Committed Data Information Rate Banda máxima que pode ser usada por rajadas, se houver disponibilidade.

📘 Exemplo prático com CIR e PIR:
Suponha que você ofereça um plano de 1 Gbps:

CIR: 100 Mbps (garantido)

PIR/CDIR: 1 Gbps (máximo)

Com isso, o cliente terá sempre 100 Mbps disponíveis, e poderá atingir até 1 Gbps quando a rede estiver ociosa (como à noite, por exemplo).

🧠 Como isso ajuda na GPON?
Como GPON tem capacidade limitada compartilhada, você pode usar CIR/PIR para:

Evitar que poucos clientes dominem toda a banda

Compartilhar melhor a capacidade total da porta

Oferecer planos mais agressivos comercialmente, sem quebrar a rede

📊 Exemplo de dimensionamento com 70 clientes:
Suponha que cada cliente tenha:

CIR = 100 Mbps

PIR = 1 Gbps

Você teria:

CIR total = 70 x 100 Mbps = 7 Gbps → acima da capacidade da GPON
🚫 Nesse caso, o CIR já não caberia. Precisa ser menor ou dividir os clientes.

Ou então:

CIR = 30 Mbps

PIR = 1 Gbps

Aí você tem:

CIR total = 70 x 30 Mbps = 2.1 Gbps ✅

O PIR é controlado por rajada, não impacta diretamente no uso simultâneo.

⚠️ Considerações importantes:
CIR deve caber dentro da banda total da PON (2,5 Gbps down / 1,25 Gbps up).

O PIR é uma concessão — não garantida — e depende da ociosidade da rede.

A OLT Huawei permite configurar Traffic Profiles com CIR/PIR por ONT.

Também é possível usar limite por T-CONT, que é o canal lógico da ONT.

✅ Conclusão prática
Se você usar CIR baixo (ex: 30-50 Mbps) e PIR de 1 Gbps, você pode sim colocar 64-70 clientes por PON, mas com as seguintes condições:

A aplicação não pode exigir 1 Gbps real o tempo todo

É obrigatório aplicar QoS e Traffic Profile por cliente

Monitorar o uso médio para ajustar a relação oversubscription (relação entre contratada vs disponível)

Se quiser, posso montar para você um exemplo real de configuração de traffic-profile para Huawei MA5603T com H805GPFD, já com CIR e PIR aplicados por ONT.

Quer seguir com isso?

Você disse:
se eu tenho um configurado com uma banda de 1GB tanto de up quanto de down , e ele esteja unsando por exemplo 10 MB de trafego, devido ao protoclolo GPON ele aloca 1GB para uso?

O ChatGPT disse:
Excelente questão, Ismael! Isso mostra que você está querendo entender a fundo como funciona o uso real da banda em GPON, o que é essencial para um provedor bem dimensionado.

❓ Resposta direta:
Não, o fato de você configurar um plano de 1 Gbps (up/down) não significa que o GPON vai alocar 1 Gbps fixos para aquele cliente o tempo todo.

📡 Como o GPON aloca a banda, de verdade:
🧬 GPON funciona de forma compartilhada e dinâmica:
Ele não reserva 1 Gbps de banda só porque você configurou esse valor no profile da ONT.

A banda é alocada sob demanda com base no tráfego real gerado.

Isso é feito usando o algoritmo DBA (Dynamic Bandwidth Allocation) da OLT.

⚙️ Entenda o DBA:
O DBA gerencia T-CONTs (contenedores de tráfego) com prioridades e modos:

T-CONT Type 1: banda fixa, sempre alocada (usado para voz).

T-CONT Type 2: garante um mínimo (CIR).

T-CONT Type 3: oferece banda extra (PIR) se disponível.

T-CONT Type 4: só usa banda quando há sobra (melhor esforço).

Ou seja:

Se o cliente está consumindo só 10 Mbps, o DBA só aloca o tempo de slot necessário para esses 10 Mbps.

Nada é desperdiçado. A alocação é feita em microsegundos, conforme necessário.

🧠 Conclusão:
Cenário Alocação GPON
Cliente tem plano de 1 Gbps Não significa que terá 1 Gbps fixo
Está usando apenas 10 Mbps GPON aloca só o necessário (10 Mbps)
DBA entra em ação Aloca slots de tempo para cada ONT

➡️ Isso é o que permite colocar vários clientes em uma mesma PON — porque quase nunca todos usam tudo ao mesmo tempo.

🔧 Se quiser ir além:
Se você quiser, posso te ajudar a:

Ver como configurar os perfis de T-CONT no Huawei (CIR, PIR, tipo)

Simular consumo e distribuição para sua rede

Planejar uma migração para XGS-PON se for necessário no futuro

Você quer um exemplo de comando/configuração na OLT Huawei com um T-CONT configurado com CIR/PIR?

Você disse:
como ver qual T-CONT Type a minha onu está?

O ChatGPT disse:
Boa pergunta, Ismael! Saber qual tipo de T-CONT a ONU está usando na sua OLT Huawei é fundamental para entender como a banda está sendo gerenciada e se está de acordo com o que você deseja entregar (garantida, por rajada, ou por melhor esforço).

✅ Passos para verificar o tipo de T-CONT de uma ONU na Huawei MA5603T
🛠️ 1. Entre no modo de configuração da GPON:
bash
Copiar
Editar
enable
config
interface gpon 0/0 ← substitua pela sua slot/port correta
🔍 2. Veja a lista de ONUs registradas na porta:
bash
Copiar
Editar
display ont info 0 0
Esse comando mostra o índice de cada ONU ativa na porta.

🔎 3. Verifique o DBA profile da ONU específica:
bash
Copiar
Editar
display ont dba-profile-id 0 0 ont-id
Isso vai te mostrar qual DBA Profile está aplicado nessa ONU (ex: DBA Profile ID 10).

📋 4. Veja os detalhes do DBA Profile (inclui T-CONT type):
bash
Copiar
Editar
display dba-profile profile-id 10
O resultado será algo assim:

bash
Copiar
Editar

---

Tcont ID : 1
Tcont Type : 4
Assured Bandwidth(kbps) : 0
Fixed Bandwidth(kbps) : 0
Max Bandwidth(kbps) : 1024000
...

---

📘 Significado dos T-CONT Types:
T-CONT Type Nome Descrição prática
1 Fixed Banda fixa, sempre alocada (voz, missão crítica)
2 Assured Banda garantida mínima (CIR)
3 Assured + Extra Banda garantida + rajadas (CIR + PIR)
4 Best Effort Sem garantia, usa quando houver disponibilidade
5 Combinado Fixo + Assured + Best Effort (misto)

🧠 Dica prática:
Se sua ONU estiver com T-CONT Type 4, ela está no modo "best effort", o que não garante nenhuma banda mínima. Isso é comum em provedores que usam planos compartilhados e alta oversubscription.

Se quiser aplicar uma política mais equilibrada e confiável, o T-CONT Type 3 é ideal para planos com CIR e PIR definidos.

Se você quiser, posso te passar um exemplo de configuração de um DBA Profile com CIR e PIR, e como aplicar ele em uma ONU.

Quer seguir com isso?

Você disse:
OLT-MA5603T-NETMITT(config-if-gpon-0/2)#display ont info 7 74

---

F/S/P : 0/2/7
ONT-ID : 74
Control flag : active
Run state : online
Config state : normal
Match state : match
DBA type : SR
ONT distance(m) : 6662
ONT last distance(m) : -
ONT battery state : holding state
ONT power type : -
Memory occupation : -
CPU occupation : -
Temperature : -
Authentic type : SN-auth
SN : 54504C47CE509360 (TPLG-CE509360)
Management mode : OMCI
Software work mode : normal
Isolation state : normal
ONT IP 0 address/mask : -
Description : alexdeoliveira116_zone_Zone_desc
r_joaomigueldasilva116-riobranco
\_authd_20250509
Last down cause : -  
 Last up time : 2025-05-09 17:19:19-03:00
Last down time : -  
 Last dying gasp time : -  
 ONT online duration : 2 day(s), 15 hour(s), 14 minute(s), 13 second(s)
ONT system up duration : 2 day(s), 15 hour(s), 21 minute(s), 34 second(s)
Type C support : Not support
Interoperability-mode : ITU-T  
 Power reduction status : -  
 FEC upstream state : use-profile-config

---

VoIP configure method : Default

---

Line profile ID : 3  
 Line profile name : SMARTOLT_FLEXIBLE_GPON

---

FEC upstream switch :Enable  
 OMCC encrypt switch :Off  
 Qos mode :PQ  
 Mapping mode :802.1p PRI  
 TR069 management :Enable  
 TR069 IP index :0

---

Notes: \* indicates Discrete TCONT(TCONT Unbound)

---

<T-CONT 0> DBA Profile-ID:2
<T-CONT 1> DBA Profile-ID:11
<Gem Index 1>

O ChatGPT disse:
Excelente, Ismael! Com esse comando display ont info 7 74, conseguimos ver claramente os T-CONTs e os DBA Profiles associados a essa ONU. Vamos analisar:

🔍 Resumo dos dados relevantes:
Porta GPON: 0/2/7

ONT-ID: 74

T-CONTs usados:

<T-CONT 0> DBA Profile-ID: 2

<T-CONT 1> DBA Profile-ID: 11

✅ Como descobrir o tipo de T-CONT (Type 1, 2, 3, 4, 5)?
Agora que sabemos os DBA Profile-IDs (2 e 11), o próximo passo é rodar:

bash
Copiar
Editar
display dba-profile profile-id 2
e depois:

bash
Copiar
Editar
display dba-profile profile-id 11
🧠 O que você deve observar na saída:
A saída vai mostrar algo como:

bash
Copiar
Editar
DBA Profile-ID: 11
Tcont Type: 4
Fixed Bandwidth(kbps): 0
Assured Bandwidth(kbps): 0
Max Bandwidth(kbps): 1024000
Com base nisso, você saberá se é:

Tcont Type Significado Situação
1 Fixed Banda reservada (usada para voz)
2 Assured Banda garantida mínima (CIR)
3 Assured + Extra Banda mínima + bursts (CIR + PIR)
4 Best effort Sem garantia, usa banda ociosa
5 Combinado Misto (geralmente para serviços avançados)

🧩 Curiosidade:
É comum ver T-CONT 0 com DBA 2 sendo usado para gerenciamento OMCI e controle, e o T-CONT 1 com o DBA real do serviço. Então o que mais importa pra ti é o Profile-ID 11 (T-CONT 1).

Se quiser, posso te ajudar a criar um DBA Profile com CIR e PIR definidos, do tipo 3, por exemplo, para garantir uma parte da banda mínima e permitir burst até 1 Gbps. Deseja seguir com isso?

Você disse:
OLT-MA5603T-NETMITT(config)#display dba-profile profile-id 2

---

Profile-name : dba-profile_2
Profile-ID: 2  
 type: 1
Bandwidth compensation: No
Fix-delay: No
Fix(kbps): 1024  
 Assure(kbps): 0  
 Max(kbps): 0  
 Additional-bandwidth: -
Best-effort-priority: -
Best-effort-weight: -
bind-times: 12

---

O ChatGPT disse:
Ótimo, Ismael! Com esse comando, agora sabemos exatamente o T-CONT Type do DBA Profile-ID 2:

🔍 Detalhes do DBA Profile-ID 2:
Campo Valor
Profile-ID 2
T-CONT Type 1 (Fixed)
Fix(kbps) 1024 kbps
Assure(kbps) 0
Max(kbps) 0

📌 Interpretação:
Esse T-CONT é do tipo 1, ou seja, FIXED. Isso significa:

O OLT reserva sempre 1024 kbps (1 Mbps) de banda exclusiva para essa T-CONT.

Ele não pode usar mais do que isso, pois Max = 0.

É usado geralmente para controle da ONU (OMCI) ou serviços críticos (como voz VoIP), mas não é adequado para internet residencial de 1 Gbps, por exemplo.

Provavelmente o serviço real (dados do usuário) está na T-CONT 1 → DBA Profile-ID 11.
Se puder, rode agora:

bash
Copiar
Editar
display dba-profile profile-id 11
Esse é o que vai nos mostrar o perfil de tráfego real do cliente final — e vai dizer se é tipo 3 (com CIR e PIR), tipo 4 (best effort), etc.

Me mostra isso que já te ajudo a montar um plano ideal com base no que você deseja entregar.

Você disse:
OLT-MA5603T-NETMITT(config)#display dba-profile profile-id 11

---

Profile-name : SMARTOLT_DEFAULT_TCONT_1G
Profile-ID: 11  
 type: 4
Bandwidth compensation: No
Fix-delay: No
Fix(kbps): 0  
 Assure(kbps): 0  
 Max(kbps): 1048000
Additional-bandwidth: -
Best-effort-priority: 0
Best-effort-weight: 128
bind-times: 19

---

O ChatGPT disse:
Perfeito, Ismael! Agora temos a resposta completa.

🔍 DBA Profile-ID 11 – Análise Técnica
Campo Valor
Tipo 4 (Best Effort)
Fix (CIR) 0 kbps
Assure (CIR) 0 kbps
Max (PIR) 1.048.000 kbps (≈1 Gbps)
Prioridade 0
Peso 128

📌 O que isso significa?
Esse DBA Profile (T-CONT Type 4):

Não tem banda garantida (CIR = 0).

Permite que a ONU use até 1 Gbps, mas somente se houver banda sobrando na OLT e na PON.

É totalmente compartilhado com os demais clientes na mesma PON.

Ideal para clientes que não exigem garantias de QoS (ex: internet residencial padrão).

🤔 Voltando à tua dúvida inicial:
"Se tenho 70 clientes com plano 1Gbps/1Gbps, consigo manter essa taxa?"

Com esse perfil Best Effort tipo 4, a resposta é:

❌ Não, não garante 1 Gbps simultâneo por cliente.
A PON tem no máximo 2,5 Gbps de downstream e 1,25 Gbps de upstream para todos os clientes.

Com 70 ONUs, se todos tentarem usar 1 Gbps ao mesmo tempo, haverá congestão, pois não há banda para todo mundo.

Porém, como o perfil é Best Effort, a velocidade será distribuída conforme o uso, e isso funciona bem enquanto poucos clientes usam muito ao mesmo tempo.

✅ O que fazer se quiser garantir banda mínima?
Você pode criar um novo DBA Profile tipo 3, assim:

plaintext
Copiar
Editar
type: 3
Fix (CIR): 200000 (ex: 200 Mbps garantido)
Max (PIR): 1000000 (1 Gbps máximo)
Assim, cada cliente teria 200 Mbps garantidos, podendo chegar a 1 Gbps se houver banda livre.

⚙️ Quer que eu te ajude a criar esse novo perfil e aplicar em uma ONU para testes?
Com isso, você pode comparar o comportamento entre Best Effort e QoS com CIR real. Deseja seguir com isso?

Você disse:
ajude a crar um type 3

O ChatGPT disse:
Claro, Ismael! Vamos criar um DBA Profile do tipo 3, que oferece garantia de banda (CIR) com capacidade de usar até uma banda máxima (PIR), se houver disponibilidade.

🎯 Objetivo
Suponha que você queira:

Garantir 200 Mbps (CIR) para o cliente.

Permitir até 1 Gbps (PIR) quando a rede estiver ociosa.

📘 Comando para criar um DBA Profile Type 3:
Entre no modo de configuração global da OLT e execute:

bash
Copiar
Editar
config
dba-profile add profile-id 200 type 3 profile-name dba-profile_200M_to_1G
fix 0 assure 200000 max 1000000
🔍 Explicação dos parâmetros:
Parâmetro Valor Descrição
type 3 Type 3 Garante uma banda mínima (CIR) com burst
assure 200000 kbps Banda garantida (200 Mbps)
max 1000000 kbps Limite máximo permitido (1 Gbps)
fix 0 Banda fixa (usada apenas no tipo 1)

✅ Aplicando na ONU:
Depois de criar o perfil, você pode aplicá-lo em uma T-CONT de uma ONU assim:

bash
Copiar
Editar
interface gpon 0/2
ont dba-profile 7 74 1 profile-id 200
Nesse exemplo, estamos aplicando o novo DBA Profile na T-CONT 1 da ONT ID 74 na porta 0/2/7.

🧪 Dica: Faça testes com speedtest e observe uso real
Use o comando abaixo para verificar se a banda está sendo entregue conforme esperado:

bash
Copiar
Editar
display ont state gpon 0/2 | include 74
display traffic gpon-ont-port eth 0/2/7 74
Se quiser monitorar todos os clientes e ver se a T-CONT está entregando corretamente, posso te mostrar como montar esse monitoramento.

Quer que a gente crie um segundo perfil com 300 Mbps garantido também? Ou deseja aplicar esse a várias ONUs automaticamente?

Você disse:
utilizo o smart OLT e criei por ele, No. UserName Domain IP-Address
4082 netmitt -- 23.82.137.90
Time: 2025-05-12 08:55:33-03:00  
 Cmd: traffic table ip name "SMARTOLT-Corporativo_1GB-DOWN" cir 1024000 pir
1024000 priority 0 inner-priority 0 priority-policy local-setting

---

O ChatGPT disse:
Excelente, Ismael! Você está usando o SmartOLT, que gera comandos automaticamente e envia para a OLT com base no que você configura via painel — isso ajuda bastante na padronização.

🔍 Análise do comando aplicado
bash
Copiar
Editar
traffic table ip name "SMARTOLT-Corporativo_1GB-DOWN" cir 1024000 pir 1024000 priority 0 inner-priority 0 priority-policy local-setting
✅ Isso configura uma tabela de tráfego IP com:
Campo Valor Interpretação
cir 1024000 kbps Garantia de 1 Gbps (CIR)
pir 1024000 kbps Pico também 1 Gbps (PIR)
priority 0 Prioridade de QoS
priority-policy local-setting Usa a política local da ONU

⚠️ Mas atenção: isso é tráfego IP, não o T-CONT / DBA Profile
A tabela de tráfego IP é importante para a QoS de camada 3, mas a real limitação de banda na PON ocorre na camada de T-CONT (DBA profile).

✅ Para garantir que os 1 Gbps realmente estão disponíveis na PON, você também precisa aplicar o DBA Profile com CIR 1 Gbps (type 3) na ONU.
🔄 Como vincular ambos corretamente

1. Crie um DBA Profile Type 3 com CIR e PIR de 1 Gbps (caso não tenha criado ainda):
   bash
   Copiar
   Editar
   dba-profile add profile-id 101 type 3 profile-name dba_1gbps_garantido
   fix 0 assure 1024000 max 1024000
2. Aplique o DBA profile na T-CONT da ONU:
   bash
   Copiar
   Editar
   interface gpon 0/2
   ont dba-profile 7 74 1 profile-id 101
   ✅ Conclusão
   Você está no caminho certo! Com o SmartOLT configurando a parte IP e você aplicando o DBA correto na T-CONT, o cliente realmente terá:

1 Gbps garantido de download (e upload, se espelhar o DBA no upstream).

Controle fino de prioridade se necessário.

Quer que eu te ajude a criar também a parte de upstream com garantia? Ou deseja confirmar se os perfis estão ativos corretamente nas ONUs?
