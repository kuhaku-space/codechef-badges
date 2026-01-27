import styles from '@/styles/Home.module.css';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home() {
    const [username, setUsername] = useState('');
    const [origin, setOrigin] = useState('');

    // Get the current origin (domain) on the client side
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setOrigin(window.location.origin);
        }
    }, []);

    const apiUrl = username
        ? `${origin}/api/codechef/${username}`
        : null;

    // Use Shields.io to render the badge from our JSON API
    // Note: This requires the API to be publicly accessible
    const badgeImageUrl = apiUrl
        ? `https://img.shields.io/endpoint?url=${encodeURIComponent(apiUrl)}`
        : null;

    const markdownCode = badgeImageUrl
        ? `[![CodeChef Rating](${badgeImageUrl})](https://www.codechef.com/users/${username})`
        : '';

    const htmlCode = badgeImageUrl
        ? `<a href="https://www.codechef.com/users/${username}"><img src="${badgeImageUrl}" alt="CodeChef Rating"></a>`
        : '';

    return (
        <div className={styles.container}>
            <Head>
                <title>CodeChef Badge Generator</title>
                <meta name="description" content="Generate CodeChef rating badges for your GitHub profile" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    CodeChef Badge Generator
                </h1>

                <p className={styles.description}>
                    Enter your CodeChef username to generate a live rating badge.
                </p>

                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Username (e.g. tourist)"
                        className={styles.input}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {username && (
                    <>
                        <div className={styles.preview}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={badgeImageUrl!} alt={`Rating for ${username}`} />
                        </div>

                        <div className={styles.codeSection}>
                            <span className={styles.label}>Markdown</span>
                            <div className={styles.codeBlock}>
                                {markdownCode}
                            </div>

                            <span className={styles.label}>HTML</span>
                            <div className={styles.codeBlock}>
                                {htmlCode}
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}
