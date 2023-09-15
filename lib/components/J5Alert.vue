<script setup lang='ts'>
import { onMounted, onUnmounted } from 'vue';


const props = defineProps({
	hasBtnCancel: { type: Boolean, default: false },
	title: { type: String, default: 'Alerta' },
	body: { type: String, default: '' },
	btnOkText: { type: String, default: 'Aceptar' },
	btnCancelText: { type: String, default: 'Cancelar' }
})

const emits = defineEmits(["confirm"])

function onClick(isConfirm: boolean) {
	emits('confirm', isConfirm)
}

onMounted(() => {
	window.document.body.classList.add('no-scroll')
})

onUnmounted(() => {
	window.document.body.classList.remove('no-scroll')
})

</script>
<template>
	<section class="j5-alert">
		<div class="j5-alert__content card">
			<slot name="header">
				<div class="j5-alert__header">
					<h2 class="j5-alert__title">{{ props.title }}</h2>
				</div>
			</slot>
			<slot name="body">
				<div class="j5-alert__body">
					<p>{{ props.body }}</p>
				</div>
			</slot>
			<slot name="footer">
				<div class="j5-alert__footer">
					<button class="j5-alert__button j5-alert__button--submit" @click.prevent="onClick(true)">
						{{ props.btnOkText }}
					</button>
					<button class="j5-alert__button j5-alert__button--cancel" v-if="props.hasBtnCancel"
						@click.prevent="onClick(false)">{{ props.btnCancelText }}
					</button>
				</div>
			</slot>
		</div>
	</section>
</template>
<style lang="scss">
@import "styles/main";

body.no-scroll {
	overflow: hidden;
}

.j5-alert {
	@include Flex(row, center, center);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: rgba(130, 138, 131, 0.2);
	backdrop-filter: blur(5px);
	z-index: 9999;

	&__content {
		@include Flex(column, center, center);
		gap: 1em;
		min-width: 280px;
		max-width: 90vw;
		max-height: 80vh;
		overflow-y: auto;
		background-color: #fff;
	}
	
	&__body{
		overflow: auto;
	}

	&__footer {
		@include Flex(row, center, center);
		gap: 1em;
	}
	
	@include tabletWidth(){
		&__content {
			@include Flex(column, center, center);
			min-width: 300px;
			max-width: 540px;
		}
		
	}
}
</style>