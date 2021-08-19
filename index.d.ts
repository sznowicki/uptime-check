declare module "uptime-check" {
	export interface Result {
		httpCode: number;
		httpCodeLang: string; // English translation for http code (e.x. "Bad Request")
		effectiveUrl: string; // see curl documentation
		response: string; // full response (header + body)
		body: string; // body (response without header)
		bodyLength: number; // body.length
		headers: Record<string, string>; // parsed headers
		status: bool; // true if test passed, false if failed
		totalTime: number; // total request time
		errorCode: string; // in case of request error, e.x. ETIMEDOUT
	}

	export interface Options {
		url: string;
		keyword?: null;
		redirectsLimit?: number;
		userAgent?: string;
		timeOut?: string;
	}

	export default function check(o: Options): Promise<Result>;
}
