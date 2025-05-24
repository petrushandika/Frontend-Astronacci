import axios from "axios";
import LOCAL_STORAGE from "./storage";
import CONFIG from "@/config/config";
import type { loginDto, registerDto } from "@/dto/auth.dto";
import type { membershipDto } from "@/dto/membership.dto";

const API = {
  AUTH: {
    REGISTER: async (data: registerDto) => {
      try {
        const response = await axios.post(
          `${CONFIG.BASE_URL}/api/auth/register`,
          data
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },

    LOGIN: async (data: loginDto) => {
      try {
        const response = await axios.post(
          `${CONFIG.BASE_URL}/api/auth/login`,
          data
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },

    GOOGLE_AUTH: async () => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/api/auth/google`);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },

    FACEBOOK_AUTH: async () => {
      try {
        const response = await axios.get(
          `${CONFIG.BASE_URL}/api/auth/facebook`
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },
  },

  USER: {
    LOGGED_USER: async () => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/api/users/me`, {
          headers: {
            Authorization: `Bearer ${LOCAL_STORAGE.GET()}`,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },

    UPGRADE_MEMBERSHIP: async (data: membershipDto) => {
      try {
        const response = await axios.post(
          `${CONFIG.BASE_URL}/api/users/upgrade`,
          data,
          {
            headers: {
              Authorization: `Bearer ${LOCAL_STORAGE.GET()}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },
  },

  CONTENT: {
    ARTICLES: async () => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/api/articles`, {
          headers: {
            Authorization: `Bearer ${LOCAL_STORAGE.GET()}`,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },

    VIDEOS: async () => {
      try {
        const response = await axios.get(`${CONFIG.BASE_URL}/api/contents`, {
          headers: {
            Authorization: `Bearer ${LOCAL_STORAGE.GET()}`,
          },
        });
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) throw error;
        throw error;
      }
    },
  },
};

export default API;
