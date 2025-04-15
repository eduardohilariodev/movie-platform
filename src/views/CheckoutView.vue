<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'
import { vMaska } from 'maska/vue'

import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useCurrency } from '@/composables/currency'
import MovieListItem from '@/components/features/movie/MovieListItem.vue'
import TrashButton from '@/components/composed/TrashButton.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const cartStore = useCartStore()
const { items, isSuccessDialogOpen } = storeToRefs(cartStore)

const { formatCurrency } = useCurrency()

const formSchema = toTypedSchema(
  z.object({
    fullName: z
      .string()
      .min(2, 'Nome completo deve ter pelo menos 2 caracteres')
      .max(50)
      .default(''),
    cpf: z
      .string()
      .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, 'CPF inválido')
      .default(''),
    phone: z
      .string()
      .regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Número de telefone inválido')
      .default(''),
    email: z.string().email('Por favor, insira um email válido').default(''),
    cep: z
      .string()
      .regex(/^\d{2}\.\d{3}-\d{3}$/, 'CEP inválido')
      .default(''),
    address: z.string().min(5, 'Endereço deve ter pelo menos 5 caracteres').default(''),
    city: z.string().min(2, 'Cidade deve ter pelo menos 2 caracteres').default(''),
    state: z.string().min(2, 'Estado deve ter pelo menos 2 caracteres').default(''),
  }),
)

const { handleSubmit, values } = useForm({
  validationSchema: formSchema,
  initialValues: {
    fullName: '',
    cpf: '',
    phone: '',
    email: '',
    cep: '',
    address: '',
    city: '',
    state: '',
  },
})

const onSubmit = handleSubmit((values) => {
  const cleanedValues = {
    ...values,
    cpf: values.cpf.replace(/\D/g, ''),
    phone: values.phone.replace(/\D/g, ''),
    cep: values.cep.replace(/\D/g, ''),
  }

  console.log('Form submitted!', cleanedValues)

  cartStore.startCheckout()
})
</script>

<template>
  <div class="mx-auto max-w-screen-lg px-4 py-16 pt-24 md:px-8 md:py-24">
    <h1 class="mb-6 text-2xl font-bold text-white">Finalizar Compra</h1>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8">
      <div class="rounded-lg border border-gray-800 bg-black/30 p-4 shadow backdrop-blur-md md:p-6">
        <form @submit.prevent="onSubmit" class="space-y-6">
          <!-- Dados Pessoais -->
          <div>
            <h2 class="mb-4 text-xl font-semibold text-white">Dados Pessoais</h2>

            <div class="space-y-4">
              <FormField v-slot="{ componentField }" name="fullName">
                <FormItem>
                  <FormControl>
                    <input
                      type="text"
                      class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                      placeholder="Nome Completo"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage class="text-red-400" />
                </FormItem>
              </FormField>

              <div class="grid grid-cols-2 gap-4">
                <FormField v-slot="{ componentField }" name="cpf">
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                        placeholder="CPF"
                        v-maska="'###.###.###-##'"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage class="text-red-400" />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="phone">
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                        placeholder="Celular"
                        v-maska="{
                          mask: (value) =>
                            value.length > 14 ? '(##) #####-####' : '(##) ####-####',
                          eager: true,
                        }"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage class="text-red-400" />
                  </FormItem>
                </FormField>
              </div>

              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormControl>
                    <input
                      type="email"
                      class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                      placeholder="E-mail"
                      v-bind="componentField"
                    />
                  </FormControl>
                  <FormMessage class="text-red-400" />
                </FormItem>
              </FormField>
            </div>
          </div>

          <!-- Endereço -->
          <div>
            <h2 class="mb-4 text-xl font-semibold text-white">Endereço</h2>

            <div class="space-y-4">
              <div class="grid grid-cols-3 gap-4">
                <FormField v-slot="{ componentField }" name="cep">
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                        placeholder="CEP"
                        v-maska="'##.###-###'"
                        inputmode="numeric"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage class="text-red-400" />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="address" class="col-span-2">
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                        placeholder="Endereço"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage class="text-red-400" />
                  </FormItem>
                </FormField>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <FormField v-slot="{ componentField }" name="city">
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                        placeholder="Cidade"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage class="text-red-400" />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="state">
                  <FormItem>
                    <FormControl>
                      <input
                        type="text"
                        class="h-10 w-full rounded-md border border-gray-700 bg-gray-900/80 px-3 py-2 text-white placeholder:text-gray-400"
                        placeholder="Estado"
                        v-bind="componentField"
                      />
                    </FormControl>
                    <FormMessage class="text-red-400" />
                  </FormItem>
                </FormField>
              </div>
            </div>
          </div>
        </form>
      </div>

      <div
        class="flex h-[600px] flex-col rounded-lg border border-gray-800 bg-black/30 p-4 shadow backdrop-blur-md md:p-6"
      >
        <div v-if="items.length > 0" class="flex h-full flex-col gap-4">
          <div class="mb-4 contents flex-grow gap-4 overflow-y-auto">
            <MovieListItem v-for="item in items" :key="item.id" :movie="item">
              <template #actions>
                <div class="flex items-center justify-between text-white">
                  <TrashButton
                    :onClick="() => cartStore.removeItem(item)"
                    tooltipText="Remover do carrinho"
                    class="ml-4"
                  />
                </div>
              </template>
            </MovieListItem>
          </div>

          <div class="mt-auto">
            <div class="flex items-center justify-between font-bold text-white">
              <div class="text-lg">Total</div>
              <div class="text-xl">
                {{ formatCurrency(Number(cartStore.totalPrice)) }}
              </div>
            </div>

            <BaseButton type="submit" class="mt-6 w-full" @click="onSubmit">
              Finalizar compra
            </BaseButton>
          </div>
        </div>
        <div v-else class="py-8 text-center text-gray-400">Seu carrinho está vazio</div>
      </div>
    </div>
  </div>

  <AlertDialog :open="isSuccessDialogOpen">
    <AlertDialogContent class="border border-gray-700 bg-gray-900 text-white">
      <AlertDialogHeader>
        <AlertDialogTitle>Obrigado, {{ values.fullName }}!</AlertDialogTitle>
        <AlertDialogDescription class="text-gray-300">
          Sua compra foi finalizada com sucesso!
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <BaseButton @click="cartStore.finishCheckout">Ir para a loja</BaseButton>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
