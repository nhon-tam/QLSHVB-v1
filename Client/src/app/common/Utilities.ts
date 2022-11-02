import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';

export class HttpUtilities {
        /**
     * Convert a returned JSON object to Object<T>.
     */
    public static convertItemFromServer<T>(object: T): T {
        const copy: T = Object.assign({}, object);
        return copy;
    }
    /**
     * Convert a Object<T> to a JSON which can be sent to the server.
     */
    public static convert<T>(object: T): T {
        const copy: T = Object.assign({}, object);
        return copy;
    }

    public static convertResponse<T>(res: HttpResponse<T>): HttpResponse<T> {
        const body: T = this.convertItemFromServer<T>(res.body);
        return res.clone({body});
    }

    public static convertArrayResponse<T>(res: HttpResponse<T[]>): HttpResponse<T[]> {
        const jsonResponse: T[] = res.body;
        const body: T[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer<T>(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Create a request option when get data from server.
     */
    public static createRequestOption(req : any) : HttpParams {
        let options: HttpParams = new HttpParams();
        if (req) {
            Object.keys(req).forEach((key) => {
                if (key !== 'sort') {
                    options = options.set(key, req[key]);
                }
            });
        if (req.sort) {
            req.sort.forEach((val) => {
                options = options.append('sort', val);
            });
        }
        }   
    return options;
    }
}