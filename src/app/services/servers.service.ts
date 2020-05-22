import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IdsServers } from "../interfaces/servers";

@Injectable()
export class MonitorService {
  API = "http://localapiserver:3001/rest/WSMONITOR/api/monitor/v1";

  constructor(private http: HttpClient) {}

  public getServers(tabela: string): Observable<any> {
    return this.http.get(`${this.API}/${"allservers?tabela="}${tabela}`);
  }
  public deleteServer(payload: IdsServers) {
    return this.http.post(`${this.API}/${"deleteserver"}`, payload);
  }
  public listServers(tabela: string): Observable<any> {
    return this.http.get(`${this.API}/${"listservers?tabela="}${tabela}`);
  }
  public createServers(payload: any): Observable<any> {
    return this.http.post(`${this.API}/${"createnewserver"}`, payload);
  }
}
