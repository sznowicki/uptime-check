declare module "uptime-check" {
	export interface UptimeCheckResult {
    status: boolean; // true if test passed, false if failed
    httpCode: number;
		httpCodeLang: string; // English translation for http code (e.x. "Bad Request")
    redirectsCount: number,
		effectiveUrl: string; // last url in the redirects chain
		response: string; // full response (header + body)
		body: string; // body (response without header)
		bodySize: number; // body siz
		headers: Record<string, string>; // parsed headers
		totalTime: number; // total request time
		errorCode?: string; // in case of a request error, e.g. ETIMEDOUT, CERT_HAS_EXPIRED
	}

	export interface UptimeCheckOptions {
		url: string;
		keyword?: string; // defaults to null
		redirectsLimit?: number; // defaults to 3
		headers?: object;
		timeOut?: string; // defaults to 10 seconds
	}

	export default function check(o: UptimeCheckOptions): Promise<UptimeCheckResult>;
}
