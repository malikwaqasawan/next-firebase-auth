'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from './styles.module.css';

export default function AuthHeader() {
  const pathname = usePathname();
  const ctaLabel = pathname === '/auth/login' ? 'Sign Up' : 'Login';
  const ctaLink = pathname === '/auth/login' ? '/auth/signup' : '/auth/login';
  return (
    <header className={styles.header}>
      <div className="container mx-auto flex justify-between items-center">
      <div className={styles.navWrapper}>
        <div className={styles.buttonsWrapper}>
        <Link className="btn btn-primary" href={ctaLink}>
          {ctaLabel}
        </Link>
        </div>
      </div>
      </div>
    </header>
  )
}
