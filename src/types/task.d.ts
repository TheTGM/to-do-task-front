type Tasks = {
  idtask: number;
  iduser: number;
  name: string;
  description: string;
  status: string;
};

type TaskPost = {
  name: string;
  status: string;
  iduser: number;
}