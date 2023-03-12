export interface Country {
  name:         Name;
  tld?:         string[];
  cca2:         string;
  ccn3?:        string;
  cca3:         string;
  cioc?:        string;
  independent?: boolean;
  status:       Status;
  unMember:     boolean;
  currencies?:  Currencies;
  idd:          Idd;
  capital?:     string[];
  altSpellings: string[];
  region:       Region;
  subregion?:   string;
  languages?:   { [key: string]: string };
  translations: { [key: string]: Translation };
  latlng:       number[];
  landlocked:   boolean;
  borders?:     string[];
  area:         number;
  demonyms?:    Demonyms;
  flag:         string;
  maps:         Maps;
  population:   number;
  gini?:        { [key: string]: number };
  fifa?:        string;
  car:          Car;
  timezones:    string[];
  continents:   Continent[];
  flags:        Flags;
  coatOfArms:   CoatOfArms;
  startOfWeek:  StartOfWeek;
  capitalInfo:  CapitalInfo;
  postalCode?:  PostalCode;
}

export interface CapitalInfo {
  latlng?: number[];
}

export interface Car {
  signs?: string[];
  side:   Side;
}

export enum Side {
  Left = "left",
  Right = "right",
}

export interface CoatOfArms {
  png?: string;
  svg?: string;
}

export enum Continent {
  Africa = "Africa",
  Antarctica = "Antarctica",
  Asia = "Asia",
  Europe = "Europe",
  NorthAmerica = "North America",
  Oceania = "Oceania",
  SouthAmerica = "South America",
}

export interface Currencies {
  HUF?: Aed;
  USD?: Aed;
  VND?: Aed;
  KZT?: Aed;
  EGP?: Aed;
  CDF?: Aed;
  XPF?: Aed;
  SHP?: Aed;
  BZD?: Aed;
  SBD?: Aed;
  BBD?: Aed;
  XAF?: Aed;
  BAM?: BAM;
  XCD?: Aed;
  CVE?: Aed;
  SCR?: Aed;
  NZD?: Aed;
  IQD?: Aed;
  EUR?: Aed;
  BGN?: Aed;
  DZD?: Aed;
  GBP?: Aed;
  HNL?: Aed;
  SDG?: BAM;
  XOF?: Aed;
  AUD?: Aed;
  GNF?: Aed;
  KYD?: Aed;
  ARS?: Aed;
  GEL?: Aed;
  LRD?: Aed;
  VES?: Aed;
  ANG?: Aed;
  CHF?: Aed;
  MMK?: Aed;
  NOK?: Aed;
  CRC?: Aed;
  INR?: Aed;
  BMD?: Aed;
  AOA?: Aed;
  KHR?: Aed;
  TOP?: Aed;
  ILS?: Aed;
  VUV?: Aed;
  CUC?: Aed;
  CUP?: Aed;
  BWP?: Aed;
  DKK?: Aed;
  ERN?: Aed;
  LYD?: Aed;
  TJS?: Aed;
  IRR?: Aed;
  TTD?: Aed;
  SAR?: Aed;
  TWD?: Aed;
  ZAR?: Aed;
  SZL?: Aed;
  ZWL?: Aed;
  UAH?: Aed;
  GHS?: Aed;
  SSP?: Aed;
  AWG?: Aed;
  JMD?: Aed;
  LKR?: Aed;
  BOB?: Aed;
  UYU?: Aed;
  JEP?: Aed;
  CAD?: Aed;
  MRU?: Aed;
  KPW?: Aed;
  LAK?: Aed;
  NIO?: Aed;
  KES?: Aed;
  BTN?: Aed;
  GMD?: Aed;
  SOS?: Aed;
  IDR?: Aed;
  MVR?: Aed;
  TND?: Aed;
  TMT?: Aed;
  CLP?: Aed;
  AFN?: Aed;
  PGK?: Aed;
  MDL?: Aed;
  THB?: Aed;
  MOP?: Aed;
  PYG?: Aed;
  BSD?: Aed;
  RSD?: Aed;
  RWF?: Aed;
  TRY?: Aed;
  ISK?: Aed;
  AMD?: Aed;
  BHD?: Aed;
  BYN?: Aed;
  MWK?: Aed;
  BDT?: Aed;
  RUB?: Aed;
  PKR?: Aed;
  JOD?: Aed;
  GYD?: Aed;
  GGP?: Aed;
  CZK?: Aed;
  BRL?: Aed;
  TZS?: Aed;
  GTQ?: Aed;
  WST?: Aed;
  SLL?: Aed;
  MUR?: Aed;
  KID?: Aed;
  BIF?: Aed;
  SGD?: Aed;
  LBP?: Aed;
  NAD?: Aed;
  SRD?: Aed;
  ZMW?: Aed;
  MZN?: Aed;
  MKD?: Aed;
  MNT?: Aed;
  AED?: Aed;
  KRW?: Aed;
  KWD?: Aed;
  FJD?: Aed;
  FOK?: Aed;
  MAD?: Aed;
  ETB?: Aed;
  ALL?: Aed;
  CKD?: Aed;
  HKD?: Aed;
  DOP?: Aed;
  IMP?: Aed;
  QAR?: Aed;
  PHP?: Aed;
  FKP?: Aed;
  NPR?: Aed;
  SYP?: Aed;
  RON?: Aed;
  OMR?: Aed;
  YER?: Aed;
  PLN?: Aed;
  JPY?: Aed;
  KGS?: Aed;
  LSL?: Aed;
  NGN?: Aed;
  STN?: Aed;
  PAB?: Aed;
  CNY?: Aed;
  PEN?: Aed;
  AZN?: Aed;
  UZS?: Aed;
  BND?: Aed;
  GIP?: Aed;
  MYR?: Aed;
  HTG?: Aed;
  SEK?: Aed;
  TVD?: Aed;
  DJF?: Aed;
  MGA?: Aed;
  COP?: Aed;
  MXN?: Aed;
  KMF?: Aed;
  UGX?: Aed;
}

export interface Aed {
  name:   string;
  symbol: string;
}

export interface BAM {
  name: string;
}

export interface Demonyms {
  eng:  Eng;
  fra?: Eng;
}

export interface Eng {
  f: string;
  m: string;
}

export interface Flags {
  png:  string;
  svg:  string;
  alt?: string;
}

export interface Idd {
  root?:     string;
  suffixes?: string[];
}

export interface Maps {
  googleMaps:     string;
  openStreetMaps: string;
}

export interface Name {
  common:      string;
  official:    string;
  nativeName?: { [key: string]: Translation };
}

export interface Translation {
  official: string;
  common:   string;
}

export interface PostalCode {
  format: string;
  regex?: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}

export enum StartOfWeek {
  Monday = "monday",
  Saturday = "saturday",
  Sunday = "sunday",
}

export enum Status {
  OfficiallyAssigned = "officially-assigned",
  UserAssigned = "user-assigned",
}
