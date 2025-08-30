// src/appwrite/config.js
import conf from '../conf/conf';
import {
  Client,
  ID,
  Databases,
  Storage,
  Query,
  Permission,
  Role,
} from 'appwrite';

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    // NOTE: conf.appwriteUrl must include /v1
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // ------------------------
  // POSTS (DB)
  // ------------------------
  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status, userId }
      );
    } catch (error) {
      console.log('Appwrite service :: createPost :: error', error);
      return false;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        { title, content, featuredImage, status }
      );
    } catch (error) {
      console.log('Appwrite service :: updatePost :: error', error);
      return false;
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log('Appwrite service :: deletePost :: error', error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log('Appwrite service :: getPost :: error', error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal('status', 'active')]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log('Appwrite service :: getPosts :: error', error);
      return false;
    }
  }

  // ------------------------
  // FILES (STORAGE)
  // ------------------------
  async uploadFile(file) {
    try {
      // Public READ, taaki <img> se access ho sake
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file,
        [Permission.read(Role.any())]
      );
    } catch (error) {
      console.log('Appwrite service :: uploadFile :: error', error);
      return false;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log('Appwrite service :: deleteFile :: error', error);
      return false;
    }
  }

  // Free plan me preview blocked hai -> direct file view use karo
  getFileView(fileId) {
    const url = this.bucket.getFileView(conf.appwriteBucketId, fileId);
    return typeof url === 'string' ? url : url?.href;
  }

  // Backward-compat: kahin code me getFilePreview call ho to woh bhi kaam kare
  getFilePreview(fileId) {
    return this.getFileView(fileId);
  }
}

const service = new Service();
export default service;
