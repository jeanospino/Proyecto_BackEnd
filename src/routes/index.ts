
import { LibrarianRoutes } from './Librarians';
import { LoansRoutes } from './Loans';
import { PenaltiesRoutes } from './Penalties';
import { ResourcesRoutes } from './Resources';
import { ReturnRecordRoutes } from './ReturnRecord';
import { UserRoutes } from './Users';
import { UserTypeRoutes } from './UserType';
import { ResourceTypeRoutes } from './ResourceType';


export class Routes {
    public LibrarianRoutes: LibrarianRoutes = new LibrarianRoutes();
    public LoansRoutes: LoansRoutes = new LoansRoutes();
    public PenaltiesRoutes: PenaltiesRoutes = new PenaltiesRoutes();
    public ResourcesRoutes: ResourcesRoutes = new ResourcesRoutes();
    public ReturnRecordRoutes: ReturnRecordRoutes = new ReturnRecordRoutes();
    public UserRoutes: UserRoutes = new UserRoutes();
    public UserTypeRoutes: UserTypeRoutes = new UserTypeRoutes();
    public ResourceTypeRoutes: ResourceTypeRoutes = new ResourceTypeRoutes();



}
