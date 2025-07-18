'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import {
  Group,
  Button,
  Flex,
  Container,
  Burger,
  Drawer,
  Paper,
  Text,
  ActionIcon,
  useMantineColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isUser = status === 'authenticated';
  const isAdmin = session?.user?.role === 'admin';

  const [opened, { toggle, close }] = useDisclosure(false);
  const [scrolling, setScrolling] = useState(false);

  const { colorScheme, setColorScheme } = useMantineColorScheme();

  console.log("SESSION", session?.user?.role);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Paper
        component="header"
        px="md"
        py="sm"
        bg={colorScheme === 'dark' ? 'dark.7' : 'white'}
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          boxShadow: scrolling ? '0 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
        }}
      >
        <Container size="lg">
          <Flex justify="space-between" align="center">
            <Text fw={700} fz="lg">
              <Link href="/">TutoSite</Link>
            </Text>

            <Group gap="md" visibleFrom="sm">
              <Link href="/">Accueil</Link>

              {isUser && <Link href="/dashboard">Mon compte</Link>}
              {isAdmin && <Link href="/admin">Admin</Link>}

              {!isUser && (
                <>
                  <Link href="/auth/login">
                    <Button variant="subtle">Connexion</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>Inscription</Button>
                  </Link>
                </>
              )}

              {isUser && (
                <Button
                  variant="outline"
                  color="red"
                  onClick={() => signOut({ callbackUrl: '/' })}
                >
                  Déconnexion
                </Button>
              )}

              <ActionIcon
                variant="subtle"
                onClick={() =>
                  setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
                }
                title="Basculer thème"
              >
                {colorScheme === 'dark' ? (
                  <IconSun size={18} />
                ) : (
                  <IconMoon size={18} />
                )}
              </ActionIcon>
            </Group>

            <Burger opened={opened} onClick={toggle} hiddenFrom="sm" />
          </Flex>
        </Container>
      </Paper>

      {/* Mobile menu */}
      <Drawer opened={opened} onClose={close} title="Menu" hiddenFrom="sm">
        <Flex direction="column" gap="sm">
          <Link href="/" onClick={close}>Accueil</Link>

          {isUser && <Link href="/dashboard" onClick={close}>Mon compte</Link>}
          {isAdmin && <Link href="/admin" onClick={close}>Admin</Link>}

          {!isUser && (
            <>
              <Link href="/auth/login" onClick={close}>
                <Button fullWidth variant="subtle">Connexion</Button>
              </Link>
              <Link href="/auth/signup" onClick={close}>
                <Button fullWidth>Inscription</Button>
              </Link>
            </>
          )}

          {isUser && (
            <Button
              fullWidth
              variant="outline"
              color="red"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              Déconnexion
            </Button>
          )}

          <ActionIcon
            variant="subtle"
            onClick={() =>
              setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')
            }
            title="Basculer thème"
          >
            {colorScheme === 'dark' ? (
              <IconSun size={18} />
            ) : (
              <IconMoon size={18} />
            )}
          </ActionIcon>
        </Flex>
      </Drawer>
    </>
  );
}

