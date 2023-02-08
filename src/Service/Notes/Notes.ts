import { MailApiResponse } from '../Service';
import { MailService } from '../Services';
import {
  ListMailerResponse,
  DeleteMailer,
  AddMailerRequest,
  GetMailerResponse,
  MasterInfo,
  UpdateMailerRequest,
  GetMailerRequest
} from './NotesType';

const service = MailService.enhanceEndpoints({ addTagTypes: ['mailer'] }).injectEndpoints({
  endpoints: (build) => ({
    getMailerMaster: build.query<MailApiResponse<MasterInfo>, { project: any }>({
      query: (project) => ({
        url: `/mailer/masterInfo/?projects=${project['project'] === undefined ? project : project['project']}/`
      })
    }),
    getContactList: build.query<MailApiResponse<ListMailerResponse>, GetMailerRequest>({
      query: () => ({ url: '/contact/' }),
      providesTags: ['mailer']
    }),
    addMailer: build.mutation<MailApiResponse<undefined>, AddMailerRequest>({
      query: (body) => ({
        url: `/mailer/?project=${localStorage.getItem('project')}`,
        method: 'POST',
        body
      }),
      invalidatesTags: ['mailer']
    }),
    updateMailer: build.mutation<MailApiResponse<undefined>, UpdateMailerRequest>({
      query: ({ id, project, mailer }) => ({
        url: `/mailer/${id}/?project=${project}`,
        method: 'PUT',
        body: { mailer }
      }),
      invalidatesTags: ['mailer']
    }),
    getMailer: build.query<MailApiResponse<GetMailerResponse>, { id: string | number; project: string | null }>({
      query: ({ id, project }) => `/mailer/${id}/?project=${project}`
    }),
    deleteMailer: build.mutation<MailApiResponse<undefined>, DeleteMailer>({
      query: ({ id, force_delete, project }) => ({
        method: 'DELETE',
        url: `/mailer/${id}/?project=${project}&${force_delete ? 'target=all' : ''}`
      }),
      invalidatesTags: ['mailer']
    }),
    updateStatus: build.mutation<any, any>({
      query: (body) => ({ method: 'PUT', url: '/mailer/status/', body: body }),
      invalidatesTags: ['mailer']
    })
  }),
  overrideExisting: true
});

export const {
  useGetMailerMasterQuery,
  useGetContactListQuery,
  useLazyGetContactListQuery,
  useDeleteMailerMutation,
  useUpdateStatusMutation,
  useAddMailerMutation,
  useLazyGetMailerQuery,
  useUpdateMailerMutation,
  useLazyGetMailerMasterQuery
} = service;
