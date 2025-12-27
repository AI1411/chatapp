//! Shared library containing gRPC definitions and common types

pub mod proto;

pub use proto::*;

/// File descriptor set for gRPC reflection
pub const FILE_DESCRIPTOR_SET: &[u8] = include_bytes!("proto/descriptor.bin");
