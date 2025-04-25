const API_LOCALIZACAO = 'https://api-bdc.io/data/reverse-geocode-client?latitude=&longitude=&localityLanguage=pt-br'
const API_CLIENTE_INFO = 'https://us1.api-bdc.net/data/client-info'
interface LocalizacaoType {
  latitude: number;
  longitude: number;
  localityLanguageRequested: string;
  continent: string;
  continentCode: string;
  countryName: string;
  countryCode: string;
  principalSubdivision: string;
  principalSubdivisionCode: string;
  city: string;
  locality: string;
  postcode: string;
  plusCode: string;
  localityInfo: {
    administrative: [
      {
        name: string;
        description: string;
        isoName: string;
        order: number;
        adminLevel: number;
        isoCode: string;
        wikidataId: string;
        geonameId: number;
      }
    ],
    informative:[
      {
        name: string;
        description: string;
        isoName: string;
        order: number;
        adminLevel: number;
        isoCode: string;
        wikidataId: string;
        geonameId: number;
      }
    ]
  }
}


interface ClientInfoType {
  ipString: string;
  ipNumeric: number;
  ipType: string;
  isBehindProxy: boolean;
  device: string;
  os: string;
  userAgent: string;
  family: string;
  versionMajor: string;
  versionMinor: string;
  versionPatch: string;
  isSpider: boolean;
  isMobile: boolean;
  userAgentDisplay: string;
  userAgentRaw: string;
  userLanguages: string[];

}

export async function getLocalizacao() : Promise<LocalizacaoType> {
  const response = await fetch(API_LOCALIZACAO)
  const data = await response.json()
  return data
}

export async function getClienteInfo() : Promise<ClientInfoType> {
  const response = await fetch(API_CLIENTE_INFO)
  const data = await response.json()
  return data
}