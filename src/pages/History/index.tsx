import { HistoryContainer, HistoryList, Status } from "./styles";

export function History(){
   
    return(
    
    <HistoryContainer>
     <h1>Meu Histórico</h1>
     <HistoryList>
     <table>
        <thead>
            <tr>
                <th>Tarefa</th>
                <th>Duração</th>
                <th>Inicio</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            <tr>
              <td>tarefa</td>
              <td>20min</td>
              <td>há dois meses</td>
              <td> <Status statusColor="green">Concluido</Status></td>
            </tr>

            <tr>
              <td>tarefa</td>
              <td>20min</td>
              <td>há dois meses</td>
              <td> <Status statusColor="green">Concluido</Status></td>
            </tr>

            <tr>
              <td>tarefa</td>
              <td>20min</td>
              <td>há dois meses</td>
              <td> <Status statusColor="green">Concluido</Status></td>
            </tr>

            <tr>
              <td>tarefa</td>
              <td>20min</td>
              <td>há dois meses</td>
              <td> <Status statusColor="yellow">andamento</Status></td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20min</td>
              <td>há dois meses</td>
              <td> <Status statusColor="red">interropido</Status></td>
            </tr>
            <tr>
              <td>tarefa</td>
              <td>20min</td>
              <td>há dois meses</td>
              <td> <Status statusColor="green">Concluido</Status></td>
            </tr>
        </tbody>
     </table>
     </HistoryList>
    </HistoryContainer>
    
    )
    }