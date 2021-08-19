declare module "uptime-check" {
	export interface Result {
		httpCode: number;
		httpCodeLang: string; // English translation for http code (e.x. "Bad Request")
		effectiveUrl: string; // last url in the redirects chain
		response: string; // full response (header + body)
		body: string; // body (response without header)
		bodyLength: number; // body.length
		headers: Record<string, string>; // parsed headers
		status: boolean; // true if test passed, false if failed
		totalTime: number; // total request time
		errorCode: string; // in case of request error, e.g. ETIMEDOUT
	}

	export interface Options {
		url: string;
		keyword?: string;
		redirectsLimit?: number;
		userAgent?: string;
		timeOut?: string;
	}

	export default function check(o: Options): Promise<Result>;
}
