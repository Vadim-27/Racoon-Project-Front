<template>
  <template v-if="!confirmEmail">
    <v-sheet class="mx-auto mt-15 form-container">
      <v-form @submit.prevent="submitUserEmailForm">
        <v-text-field
          v-model="formData.email"
          label="Email"
          :rules="emailRules"
          :error-messages="errors.email"
          type="email"
        />

        <div style="position: relative" >
          <p class="login-error">
            {{ errors.detail }}
          </p>
        </div>

        <BaseButton
          type="submit"
          class="mt-5 w-100"
          :button-name="`Reset ${property}`"
        />
      </v-form>
    </v-sheet>
  </template>
  <template v-else>
    <p>
      {{ `Go to your email and confirm the reset of your ${property}` }}.
    </p>
  </template>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { authUserApi } from '@/api';
import { objUtils } from '@/utils';
import { VALIDATION_RULES } from '@/constants';
import BaseButton from '@/components/BaseButton';

export default {
  name: 'ConfirmActivationAccount',
  components: {
    BaseButton,
  },
  setup() {
    const confirmEmail = ref(false);
    const router = useRouter();
    const formData = ref({ email: '' });
    const errors = ref({ detail: '' });
    const emailRules = ref(VALIDATION_RULES.email);
    const property = router.currentRoute.value.params.property;

    const submitUserEmailForm = async () => {
      errors.value = objUtils.createEmptyObject(errors.value);

      if (!emailRules.value.every(rule => rule(formData.value.email))) {
        return;
      }

      try {
        const { status } = await authUserApi.resetUserData(formData.value, property);
        confirmEmail.value = status === 204;
      } catch (err) {
        errors.value.detail = err.response.data[0] || err.response.data.email[0];
      }
    };

    return {
      property,
      emailRules,
      confirmEmail,
      formData,
      errors,
      submitUserEmailForm,
    }
  },
};
</script>

<style>
.login-error {
  width: 100%;
  color: #b02828;
  font-size: 0.75rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, 0%);
}
.form-container {
  width: 350px;
}
</style>
