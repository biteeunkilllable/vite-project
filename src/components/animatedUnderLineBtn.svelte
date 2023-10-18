<script lang="ts">
  import {slide} from 'svelte/transition';
  export let url: string;
</script>

<main class="#fff"
      transition:slide={{axis:"x"}}>
  <a class={"menu__link flex flex-row items-center mr-7"} href={url}>
    <slot />
  </a>
</main>

<style>
  /* <reset-style> ============================ */
  a {
    text-decoration: none;
    display: flex;
    align-items: center;
  }
  /* <main-style> ============================ */
  .menu__link {
    color: #fff;
    line-height: 2;
    position: relative;
  }

  .menu__link::before {
    content: "";
    width: 0;
    height: 2px;
    border-radius: 2px;
    background-color: #fff;
    position: absolute;
    bottom: -0.25rem;
    left: 0;
    transition: width 0.4s;
  }

  .menu__link:hover::before {
    width: 100%;
  }
  svg {
    margin-left: 10px;
  }
</style>
