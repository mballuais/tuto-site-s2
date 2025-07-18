import React from 'react';
import { Providers } from './providers';
import Navbar from '@/components/Navbar';
import Link from 'next/link';
import {
  AppShell,
  AppShellHeader,
  AppShellFooter,
  AppShellMain,
  Container,
  ColorSchemeScript,
  Text,
} from '@mantine/core';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tuto Site Semestre 2',
  description: 'Site de tutoriels développé pour le S2',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="stylesheet" href="https://unpkg.com/@mantine/core@latest/styles.css" />
      </head>
      <body>
        <Providers>
          <AppShell padding="md" withBorder={false} layout="default">
            <AppShellHeader>
              <Navbar />
            </AppShellHeader>

            <AppShellMain>
              <Container size="lg" pt="md">
                {children}
              </Container>
            </AppShellMain>

            <AppShellFooter>
              <div
                style={{
                  padding: '1rem',
                  textAlign: 'center',
                  width: '100%',
                  borderTop: '1px solid #e9ecef',
                }}
              >
                <Text size="sm" c="dimmed">
                  Travail pédagogique — pas d’objectifs commerciaux —{' '}
                  <Link href="/cgu">Mentions légales</Link>
                </Text>
              </div>
            </AppShellFooter>
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
