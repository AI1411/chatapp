use std::io::Result;

fn main() -> Result<()> {
    let proto_files = [
        "../../proto/chat.proto",
        "../../proto/user.proto",
        "../../proto/common.proto",
    ];

    let include_dirs = ["../../proto"];

    tonic_build::configure()
        .build_server(true)
        .build_client(true)
        .out_dir("src/proto")
        .file_descriptor_set_path("src/proto/descriptor.bin")
        .compile_protos(&proto_files, &include_dirs)?;

    // Rerun if proto files change
    for proto in &proto_files {
        println!("cargo:rerun-if-changed={}", proto);
    }

    Ok(())
}
