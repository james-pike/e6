import { component$ } from '@builder.io/qwik';
import { useSession } from '~/routes/plugin@auth';
import styles from './header.module.css';

export default component$(() => {
  const session = useSession();

  return (
    <header class={styles.header}>
      <div class={['container', styles.wrapper]}>
        <div class={styles.logo}>
          <a href="/" title="Pottery Studio">
            <span class="text-xl font-bold text-clay-900 font-serif">Pottery Studio</span>
          </a>
        </div>
        <ul>
          <li>
            <a href="/" class="hover:text-clay-600 transition-colors">
              Home
            </a>
          </li>
          <li>
            <a href="#workshops" class="hover:text-clay-600 transition-colors">
              Workshops
            </a>
          </li>
          {session.value?.user ? (
            <li>
              <a href="/dashboard" class="hover:text-clay-600 transition-colors font-medium">
                Dashboard
              </a>
            </li>
          ) : (
            <li>
              <a href="/signin" class="hover:text-clay-600 transition-colors font-medium">
                Sign In
              </a>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
});

