// based off https://gitlab.com/mjbecze/buffer-pipe

class PipeBuffer {

    public buffer: Uint8Array;
    private _bytesRead: number;
    private _bytesWrote: number;

    constructor(buf:Uint8Array = new Uint8Array(0)) {
        this.buffer = buf
        this._bytesRead = 0
        this._bytesWrote = 0
    }
  
    read(num:i32) : Uint8Array {
        this._bytesRead += num
        const data = this.buffer.slice(0, num)
        this.buffer = this.buffer.slice(num)
        return data
    }

    write(buf: u8[]) : void {
        var inputBuffer = this._load(buf);
        this.writeUint8Array(inputBuffer);
    }

    writeArrayBuffer(inputBuffer: ArrayBuffer): void{
        this.writeUint8Array(
            Uint8Array.wrap(
                inputBuffer,
                0,
                inputBuffer.byteLength
            ));
    }

    writeUint8Array(inputBuffer: Uint8Array) : void {
        this._bytesWrote += inputBuffer.length

        var newBuffer = new Uint8Array(inputBuffer.length + this.buffer.length);
      
        newBuffer.set(this.buffer)
        newBuffer.set(inputBuffer, this.buffer.byteLength);
        this.buffer = newBuffer;
    }

    append(pipe: PipeBuffer) : void {
        this.writeUint8Array(pipe.buffer);
    }

    _load(buf: u8[]): Uint8Array{
        var newBuffer = new Uint8Array(buf.length);
        for (let i: i32 = 0; i < buf.length; i++) {
            newBuffer[i] = buf[i]
        }
        return newBuffer;
    }
}


export {
    PipeBuffer
};