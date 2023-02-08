// List Setting response
// type: response
// method: get
// path: /settings/
export interface ListMailerResponse {
  count: number;
  links: Links;
  results: Result[];
}

export interface Links {
  next: null;
  previous: null;
}

export interface Result {
contact_id: number,
first_name: string,
last_name: string,
phone_number: string,
email_id: string,
status: string,
status_name: string;
created_by: string;
created_at: Date;
updated_by?: string;
updated_at?: string | any;
}

export interface UpdatedInfo {
  updated_by: string;
  updated_at: string;
}

export interface DeleteMailer {
  id: number;
  force_delete?: boolean;
  project: string | number | undefined;
}

export interface UpdateMailer {
  mailer_id: number;
  status: number;
}

// add mailer request
// type: request body
// method: POST
// path: /mailer/
export interface AddMailerRequest {
  mailer: Mailer;
}
export interface Mailer {
  mailer_name: string;
  settings: number[];
  project: number;
  folder: number;
  status: string;
  mailer_templates: AddMailerTemplate[];
}

export interface AddMailerTemplate {
  subject: string;
  template: string;
  action: number | string;
  status: number;
}

// update mailer request
// type: request body
// method: PUT
// path: /mailer/${id}
interface UpdateMailerRequest extends AddMailerRequest {
  id: string;
  project: string | number | undefined;
}

//get mailer response
// type: response body
// method: GET
// path: /mailer/${id}
export interface GetMailerResponse {
  mailer_id: number;
  mailer_name: string;
  settings: Setting[];
  mailer_templates: GetMailerTemplate[];
  project: number;
  project_name: string;
  status: string;
  status_name: string;
  created_by: string;
  created_at: Date;
  folder: string;
  folder_name: string;
  updated_info?: UpdatedInfo;
  updated_by?: string;
  updated_at?: string;
  masterInfo: MasterInfo;
}

export interface GetMailerTemplate {
  mailer_template_id: number;
  subject: string;
  action: number;
  action_name: string;
  unique_name: string;
  status: string;
  status_name: string;
  template: number;
  template_name: string;
  language: number;
  language_name: string;
  folder_info: FolderInfo;
}

export interface FolderInfo {
  folder: number;
  folder_name: string;
}

export interface MasterInfo {
  project: Language[];
  setting: Language[];
  status: Language[];
  language: Language[];
}

export interface Language {
  label: string;
  value: string;
}

export interface Setting {
  setting: number;
  setting_name: string;
}

export interface GetMailerRequest {
  folder?: string;
  page?: number;
  status?: number;
  project?: string | number | undefined;
  setting?: number;
}
