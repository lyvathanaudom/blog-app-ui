// composables/apiClient.ts
export const useApiClient = () => {
    const config = useRuntimeConfig();
    
    return $fetch.create({
      baseURL: config.public.baseURL,
      credentials: 'include',
      headers: {
        Authorization: 'Basic ' + btoa(
          encodeURIComponent(config.public.username) + ':' +
          encodeURIComponent(config.public.password)
        )
      },
      onRequestError({ error }) {
        console.error('API Request Failed:', error);
      }
    });
  };