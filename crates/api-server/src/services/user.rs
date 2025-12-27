//! User service implementation

use shared::proto::user::{
    user_service_server::UserService, GetUserRequest, GetUserResponse, LoginRequest,
    LoginResponse, RegisterRequest, RegisterResponse,
};
use sqlx::PgPool;
use tonic::{Request, Response, Status};
use tracing::info;

/// User service implementation
pub struct UserServiceImpl {
    pool: PgPool,
}

impl UserServiceImpl {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[tonic::async_trait]
impl UserService for UserServiceImpl {
    async fn register(
        &self,
        request: Request<RegisterRequest>,
    ) -> Result<Response<RegisterResponse>, Status> {
        let req = request.into_inner();
        info!("Registering user: {}", req.email);

        // TODO: Implement user registration logic
        let response = RegisterResponse {
            user: None,
            token: String::new(),
            request_id: req.request_id,
        };

        Ok(Response::new(response))
    }

    async fn login(
        &self,
        request: Request<LoginRequest>,
    ) -> Result<Response<LoginResponse>, Status> {
        let req = request.into_inner();
        info!("User login: {}", req.email);

        // TODO: Implement login logic
        let response = LoginResponse {
            user: None,
            token: String::new(),
        };

        Ok(Response::new(response))
    }

    async fn get_user(
        &self,
        request: Request<GetUserRequest>,
    ) -> Result<Response<GetUserResponse>, Status> {
        let req = request.into_inner();
        info!("Getting user: {}", req.user_id);

        // TODO: Implement get user logic
        let response = GetUserResponse { user: None };

        Ok(Response::new(response))
    }
}
