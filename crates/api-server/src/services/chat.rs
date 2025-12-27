//! Chat service implementation

use shared::proto::chat::{
    chat_service_server::ChatService, CreateRoomRequest, CreateRoomResponse, GetMessagesRequest,
    GetMessagesResponse, GetRoomsRequest, GetRoomsResponse, SendMessageRequest,
    SendMessageResponse,
};
use sqlx::PgPool;
use tonic::{Request, Response, Status};
use tracing::info;

/// Chat service implementation
pub struct ChatServiceImpl {
    pool: PgPool,
}

impl ChatServiceImpl {
    pub fn new(pool: PgPool) -> Self {
        Self { pool }
    }
}

#[tonic::async_trait]
impl ChatService for ChatServiceImpl {
    async fn create_room(
        &self,
        request: Request<CreateRoomRequest>,
    ) -> Result<Response<CreateRoomResponse>, Status> {
        let req = request.into_inner();
        info!("Creating room: {}", req.name);

        // TODO: Implement room creation logic
        let response = CreateRoomResponse {
            room: None,
            request_id: req.request_id,
        };

        Ok(Response::new(response))
    }

    async fn get_rooms(
        &self,
        request: Request<GetRoomsRequest>,
    ) -> Result<Response<GetRoomsResponse>, Status> {
        let _req = request.into_inner();
        info!("Getting rooms");

        // TODO: Implement get rooms logic
        let response = GetRoomsResponse { rooms: vec![] };

        Ok(Response::new(response))
    }

    async fn send_message(
        &self,
        request: Request<SendMessageRequest>,
    ) -> Result<Response<SendMessageResponse>, Status> {
        let req = request.into_inner();
        info!("Sending message to room: {}", req.room_id);

        // TODO: Implement send message logic
        let response = SendMessageResponse {
            message: None,
            request_id: req.request_id,
        };

        Ok(Response::new(response))
    }

    async fn get_messages(
        &self,
        request: Request<GetMessagesRequest>,
    ) -> Result<Response<GetMessagesResponse>, Status> {
        let req = request.into_inner();
        info!("Getting messages for room: {}", req.room_id);

        // TODO: Implement get messages logic
        let response = GetMessagesResponse {
            messages: vec![],
            next_cursor: String::new(),
        };

        Ok(Response::new(response))
    }
}
