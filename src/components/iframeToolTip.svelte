<script>
    export let styles = `
    .tooltip {
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
  background: #ffffff;
  color: black;
  padding: 5px 8px;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  transform:translate(-50%,-150%);
}

.tooltip::before {
  position: absolute;
  content: "";
  height: 8px;
  width: 8px;
  background: #ffffff;
  bottom: 0;
  left: 50%;
  z-index: 0;
  transform: translate(-50%,50%) rotate(45deg);
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
    `;
    export let This = undefined;
</script>
<span bind:this={This} class="tooltip flex items-center">
    <slot />
</span>