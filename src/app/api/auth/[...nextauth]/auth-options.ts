import type {NextAuthOptions} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import {env} from '@/env.mjs';
import {pagesOptions} from './pages-options';
import {ApiEndpoint} from "@/config/endpoints";

export const authOptions: NextAuthOptions = {
    // debug: true,
    pages: {
        ...pagesOptions,
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async session({session, token}) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.idToken as string,
                },
            };
        },
        async jwt({token, user}) {
            if (user) {
                // return user as JWT
                token.user = user;
            }
            return token;
        },
        async redirect({url, baseUrl}) {
            const parsedUrl = new URL(url, baseUrl);
            if (parsedUrl.searchParams.has('callbackUrl')) {
                return `${baseUrl}${parsedUrl.searchParams.get('callbackUrl')}`;
            }
            if (parsedUrl.origin === baseUrl) {
                return url;
            }
            return baseUrl;
        },
    },
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: 'Credentials',
            credentials: {},
            async authorize(credentials: any) {
                try {

                    const baseURL = process.env.SERVER_BASE_URL
                    const response = await fetch(`${baseURL}${ApiEndpoint.LOGIN}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(credentials),
                    });

                    const responseJson = await response.json();

                    // @ts-ignore
                    if (response.ok && responseJson.success) {
                        // Authentication successful
                        return {
                            // @ts-ignore
                            id: responseJson.data.user.userId,
                            // @ts-ignore
                            name: responseJson.data.user.fullName,
                            // @ts-ignore
                            username: responseJson.data.user.username,
                            // Add other user properties as needed
                            // @ts-ignore
                            token: responseJson.data.token, // Save the token for further API calls
                        };
                    } else {
                        // Authentication failed
                        return null;
                    }
                } catch (error) {
                    // Handle fetch or other errors
                    console.error('Authentication error:', error);
                    return Promise.resolve(null);
                }
            },
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID || '',
            clientSecret: env.GOOGLE_CLIENT_SECRET || '',
            allowDangerousEmailAccountLinking: true,
        }),
    ],
};
